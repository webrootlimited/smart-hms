"use server";

import connectToDb from "@/lib/connectToDb.js";
import User from "@/models/user.model";
import crypto from 'crypto';
import bcrypt from "bcryptjs";
import { sendOtpEmail, sendStaffInvitationEmail, sendResetPasswordEmail } from "@/lib/mailer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Staff from "@/models/staff.model";
import Doctor from "@/models/doctor.model";
import Clinic from "@/models/clinic.model"

import { uploadImage } from "@/lib/utils";
import { generateEmployeeId } from "@/lib/utils";

// Patient and Dcotor Registration
export async function register(data) {
    try {
        await connectToDb();

        const { fullName, dob, phoneNumber, email, password, gender, role } = data;

        if (role !== "patient" && role !== "doctor") throw new Error("Invalid role specified");

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) throw new Error("Email already registered");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        const user = await User.create({
            fullName,
            dob,
            phoneNumber,
            email,
            password: hashedPassword,
            gender,
            otp,
            otpExpiresAt,
            role,
            isVerified: false,
        });

        // Send OTP email
        await sendOtpEmail(email, otp, role, otpExpiresAt.toLocaleString());

        return { success: true, message: "User registered. Please verify OTP.", userId: user._id };
    } catch (err) {
        console.error("❌ Register error:", err);
        return { success: false, message: err.message || "Registration failed" };
    }
}

// Registration for other than patient and doctor roles - created by admin
export async function registerUser(data, role) {
    try {
        await connectToDb();
        console.log(data, role);

        const { fullName, dob = null, phoneNumber, email, password, gender, profilePic = null, sendInvitation = false } = data;

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) throw new Error("Email already registered");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        let roleRef = null;

        // Create role-specific document
        if (role === "receptionist" || role === "nurse" || role === "billing_officer") {
            const staff = await Staff.create({ workLocation: data.workLocation, staffType: role, employeeId: generateEmployeeId(role) });
            roleRef = staff._id;
        } else {
            throw new Error("Invalid role specified");
        }

        let url = null;
        if (profilePic) {
            url = await uploadImage(profilePic);
        }

        // Create main user
        const user = await User.create({
            fullName,
            profilePic: url,
            dob,
            phoneNumber,
            email,
            password: hashedPassword,
            gender: gender.toLowerCase(),
            role,
            staffProfile: role !== "doctor" ? roleRef : undefined,
        });
        console.log("user", user);

        if (sendInvitation) {
            const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`;

            await sendStaffInvitationEmail(
                email,
                fullName,
                role,
                email,
                password,
                loginUrl
            );
        }

        return { success: true, message: "User registered successfully.", userId: user._id };
    } catch (err) {
        console.error("❌ Register error:", err);
        return { success: false, message: err.message || "Registration failed" };
    }
}

//  Verify OTP
export async function verifyOtp(userId, otpInput) {
    try {
        await connectToDb();
        console.log("userId", userId);
        const user = await User.findById(userId);
        console.log(user);

        if (!user) throw new Error("User not found");

        if (user.isVerified) {
            // Already verified -> generate JWT if not already set
            const payload = { id: user._id, email: user.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

            const cookieStore = await cookies();
            cookieStore.set({
                name: "token",
                value: token,
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });

            return { success: true, message: "Already verified, JWT issued", user: user };
        }

        if (!user.otp || !user.otpExpiresAt) throw new Error("OTP not generated");

        if (new Date() > user.otpExpiresAt) throw new Error("OTP expired");

        if (otpInput !== user.otp) throw new Error("Invalid OTP");

        // Mark as verified
        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        // Generate JWT token
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return { success: true, message: "OTP verified and logged in successfully", user: user };
    } catch (err) {
        console.error("❌ OTP verify error:", err.message);
        return { success: false, message: err.message || "OTP verification failed" };
    }
}

// Login User
export async function loginUser(email, password) {
    try {
        await connectToDb();

        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        if (user.status === "suspended") {
            throw new Error("Your account has been suspended. Contact admin.");
        }

        // Not verified -> send OTP
        if (!user.isVerified) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;
            await user.save();

            await sendOtpEmail(email, otp, user.role, otpExpiresAt.toLocaleString());

            return { success: false, message: "Please verify your OTP. OTP sent to email.", userId: user._id };
        }

        // Verified -> generate JWT
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

        // 🔹 Update last login time
        user.lastLoginAt = new Date();
        await user.save({ validateBeforeSave: false });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return { success: true, message: "Login successful", user: user };
    } catch (err) {
        console.error("❌ Login error:", err);
        return { success: false, message: err.message || "Login failed" };
    }
}

// Resend OTP
export async function resendOtp(userId) {
    try {
        await connectToDb();
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (user.isVerified) return { success: false, message: "Already verified" };

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        await sendOtpEmail(user.email, otp);

        return { success: true, message: "OTP resent successfully" };
    } catch (err) {
        console.error("❌ Resend OTP error:", err);
        return { success: false, message: err.message || "Failed to resend OTP" };
    }
}


// Get all doctors
export async function getDoctors() {
    try {
        await connectToDb();
        const doctors = await User.find({ role: "doctor" }).populate({
            path: "doctorProfile",
            populate: {
                path: "workLocations.clinic",
                model: "Clinic",
            },
            populate: {
                path: "assiatnts",
                model: "User",
            },
        });
        console.log(doctors);

        return { success: true, doctors: JSON.parse(JSON.stringify(doctors)) };
    } catch (err) {
        console.error("❌ Get doctors error:", err);
        return { success: false, message: err.message || "Failed to get doctors" };
    }
}

// Get all users
export async function getUsers() {
    try {
        await connectToDb();
        const users = await User.find().sort({ createdAt: -1 }).populate({
            path: "doctorProfile",
            populate: {
                path: "workLocations.clinic",
                model: "Clinic",
            },
        })
            .populate({
                path: "staffProfile",
                populate: {
                    path: "workLocation.clinic",
                },
            })
            .populate("patientProfile");
        console.log(users);

        return { success: true, users: JSON.parse(JSON.stringify(users)) };
    } catch (err) {
        console.error("❌ Get users error:", err);
        return { success: false, message: err.message || "Failed to get users" };
    }
}

// Get user details
export async function getUserDetails(userId) {
    try {
        await connectToDb();
        const user = await User.findById(userId)
            .populate({
                path: "doctorProfile",
                populate: {
                    path: "workLocations.clinic",
                    model: "Clinic",
                },
            })
            .populate({
                path: "staffProfile",
                populate: {
                    path: "workLocation.clinic",
                },
            })
            .populate("patientProfile");

        console.log(user);

        return { success: true, user: JSON.parse(JSON.stringify(user)) };
    } catch (err) {
        console.error("❌ Get user details error:", err);
        return { success: false, message: err.message || "Failed to get user details" };
    }
}

// Delete user
export async function deleteUser(userId) {
    try {
        await connectToDb();
        const user = await User.findByIdAndDelete(userId).populate({
            path: "doctorProfile",
            populate: {
                path: "workLocations.clinic",
                model: "Clinic",
            },
        })
            .populate({
                path: "staffProfile",
                populate: {
                    path: "workLocation.clinic",
                },
            })
            .populate("patientProfile");

        return { success: true, user: JSON.parse(JSON.stringify(user)) };
    } catch (err) {
        console.error("❌ Delete user error:", err);
        return { success: false, message: err.message || "Failed to delete user" };
    }
}

// Deactivate user
export async function deactivateUser(userId) {
    try {
        await connectToDb();

        const user = await User.findById(userId).populate({
            path: "doctorProfile",
            populate: {
                path: "workLocations.clinic",
                model: "Clinic",
            },
        })
            .populate({
                path: "staffProfile",
                populate: {
                    path: "workLocation.clinic",
                },
            })
            .populate("patientProfile");
        if (!user) throw new Error("User not found");

        user.status = "suspended";
        await user.save();

        return {
            success: true,
            message: "User account suspended successfully",
            user: JSON.parse(JSON.stringify(user))
        };
    } catch (err) {
        console.error("❌ Suspend error:", err);
        return {
            success: false,
            message: err.message || "Failed to suspend user",
        };
    }
}

export async function activateUser(userId) {
    try {
        await connectToDb();

        const user = await User.findById(userId).populate({
            path: "doctorProfile",
            populate: {
                path: "workLocations.clinic",
                model: "Clinic",
            },
        })
            .populate({
                path: "staffProfile",
                populate: {
                    path: "workLocation.clinic",
                },
            })
            .populate("patientProfile");
        if (!user) throw new Error("User not found");

        user.status = "active";
        await user.save();

        return {
            success: true,
            message: "User account activated successfully",
            user: JSON.parse(JSON.stringify(user))
        };
    } catch (err) {
        console.error("❌ Activate error:", err);
        return {
            success: false,
            message: err.message || "Failed to activate user",
        };
    }
}

// update user
export async function updateStaff(userId, formData) {
    try {
        await connectToDb();

        const user = await User.findById(userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Only allow updates for these roles via this action
        const allowedStaffRoles = ["nurse", "receptionist", "billing_officer"];
        if (!allowedStaffRoles.includes(user.role?.toLowerCase())) {
            return {
                success: false,
                message: "This action is only for Nurse, Receptionist and Billing Officer roles"
            };
        }

        // ── Extract form fields ───────────────────────────────────────
        const fullName = formData.get("fullName")?.trim();
        const phoneNumber = formData.get("phoneNumber")?.trim();
        const role = formData.get("role")?.trim();
        const clinicId = formData.get("clinicId");
        const status = formData.get("status"); // "active" | "pending" | "suspended"
        const departments = formData.getAll("departments[]");
        const profilePic = formData.get("profilePic");

        // Basic validation
        if (!fullName || !phoneNumber) {
            return { success: false, message: "Full name and phone number are required" };
        }

        // Optional: prevent role change (recommended for stability)
        if (role && role.toLowerCase() !== user.role?.toLowerCase()) {
            return {
                success: false,
                message: "Role cannot be changed through this action. Contact system administrator."
            };
        }

        // Prepare user updates
        const userUpdate = {
            fullName: fullName || user.fullName,
            phoneNumber: phoneNumber || user.phoneNumber,
            status: status || user.status,
        };

        // Profile picture
        if (profilePic && profilePic.size > 0) {
            const newImageUrl = await uploadImage(profilePic);
            if (newImageUrl) {
                userUpdate.profilePic = newImageUrl;
            }
        }

        // ── Update Staff profile (only for allowed roles) ───────────────
        if (user.staffProfile) {
            const staffUpdate = {};

            if (clinicId) {
                staffUpdate["workLocation.clinic"] = clinicId;
            }

            if (Array.isArray(departments) && departments.length > 0) {
                staffUpdate["workLocation.departments"] = departments;
            }

            if (Object.keys(staffUpdate).length > 0) {
                await Staff.findByIdAndUpdate(user.staffProfile, {
                    $set: staffUpdate
                }, { new: true });
            }
        }

        // Final user update
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: userUpdate },
            { new: true, runValidators: true }
        );

        return {
            success: true,
            message: "Staff profile updated successfully",
            user: JSON.parse(JSON.stringify(updatedUser))
        };

    } catch (error) {
        console.error("updateStaff error:", error);
        return {
            success: false,
            message: error.message || "Failed to update staff profile"
        };
    }
}

// Send Reset password mail to speciifc role - by admin
export async function requestPasswordReset(email) {
    try {
        if (!email) {
            throw new Error('Email is required');
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return {
                success: true,
                message: 'If an account exists, a reset link has been sent',
            };
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);
        const expiresAt = Date.now() + 15 * 60 * 1000;

        // Save token & expiry in DB
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = expiresAt;
        await user.save();

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}&email=${email}`;

        await sendResetPasswordEmail(
            user.email,
            user.role || 'User',
            resetLink,
            new Date(expiresAt).toLocaleString()
        );

        return {
            success: true,
            message: 'If an account exists, a reset link has been sent',
        };
    } catch (error) {
        console.error('requestPasswordReset error:', error);

        return {
            success: false,
            message: 'Failed to process password reset request',
        };
    }
}

// Update Password Using Token
export async function updatePassword(userId, token, newPassword) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        if (!user.resetPasswordToken || !user.resetPasswordExpires) {
            throw new Error('No reset request found');
        }

        if (user.resetPasswordExpires < Date.now()) {
            throw new Error('Reset token has expired');
        }

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isTokenValid) {
            throw new Error('Invalid reset token');
        }

        // Update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Clear reset token and expiry
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return { success: true, message: 'Password updated successfully' };
    } catch (err) {
        console.error('updatePassword error:', err);
        return { success: false, message: err.message || 'Failed to update password' };
    }
}


