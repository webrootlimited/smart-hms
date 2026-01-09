"use server";

import connectToDb from "@/lib/connectToDb.js";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { sendOtpEmail, sendStaffInvitationEmail } from "@/lib/mailer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Staff from "@/models/staff.model";
import Doctor from "@/models/doctor.model";

import { writeFile } from 'fs/promises';
import { join } from 'path';


// HELPER FUNCTIONS 
async function uploadImage(image) {
    const file = image;

    if (!file) {
        return { error: 'No file uploaded' };
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to /public/uploads (or any folder)
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(filepath, buffer);

    // Return URL for display/DB
    return `/uploads/${filename}`;
}

function generateEmployeeId(role) {
    const roleMap = {
        doctor: "DOC",
        receptionist: "REC",
        nurse: "NUR",
        billing_officer: "BIL"
    };

    const prefix = roleMap[role] || "EMP";
    const randomStr = Math.random().toString(36).substr(2, 6).toUpperCase();

    return `${prefix}-${randomStr}`;
}


// Register a new user - specific for patient and doctor registration
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
        await sendOtpEmail(email, otp);

        return { success: true, message: "User registered. Please verify OTP.", userId: user._id };
    } catch (err) {
        console.error("❌ Register error:", err);
        return { success: false, message: err.message || "Registration failed" };
    }
}

// Register a new user - specific for other than patient roles - created by admin
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
        } else if (role === "doctor") {
            const doctor = await Doctor.create({
                department: data.department,
                employeeId: generateEmployeeId("doctor"),
                schedule: data.schedule,
                speciality: data.speciality,
                startDate: data.startDate,
                clinics: [data.workLocation],
            });
            console.log("doctor", doctor);
            roleRef = doctor._id;
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
            doctorProfile: role === "doctor" ? roleRef : undefined,
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

        // Not verified -> send OTP
        if (!user.isVerified) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;
            await user.save();

            await sendOtpEmail(email, otp);

            return { success: false, message: "Please verify your OTP. OTP sent to email.", userId: user._id };
        }

        // Verified -> generate JWT
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

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
        const doctors = await User.find({ role: "doctor" }).populate("doctorProfile");
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
        const users = await User.find().sort({ createdAt: -1 }).populate("doctorProfile").populate("staffProfile").populate("patientProfile");
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
        const user = await User.findById(userId).populate("doctorProfile").populate("staffProfile").populate("patientProfile");
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
        const user = await User.findByIdAndDelete(userId);

        return { success: true };
    } catch (err) {
        console.error("❌ Delete user error:", err);
        return { success: false, message: err.message || "Failed to delete user" };
    }
}

