"use server";

import connectToDb from "@/lib/connectToDb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/mailer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Register a new user
export async function registerUser(data) {
    try {
        await connectToDb();

        const { fullName, dob, phoneNumber, email, password, gender } = data;

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) throw new Error("Email already registered");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        const user = await User.create({
            fullName,
            dob,
            phoneNumber,
            email,
            password: hashedPassword,
            gender,
            otp,
            otpExpiry,
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

//  Verify OTP
export async function verifyOtp(userId, otpInput) {
    try {
        await connectToDb();

        const user = await User.findById(userId);
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

            return { success: true, message: "Already verified, JWT issued", userId: user._id };
        }

        if (!user.otp || !user.otpExpiry) throw new Error("OTP not generated");

        if (new Date() > user.otpExpiry) throw new Error("OTP expired");

        if (otpInput !== user.otp) throw new Error("Invalid OTP");

        // Mark as verified
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
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

        return { success: true, message: "OTP verified and logged in successfully", userId: user._id };
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
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

            user.otp = otp;
            user.otpExpiry = otpExpiry;
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

        return { success: true, message: "Login successful", userId: user._id };
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
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendOtpEmail(user.email, otp);

        return { success: true, message: "OTP resent successfully" };
    } catch (err) {
        console.error("❌ Resend OTP error:", err);
        return { success: false, message: err.message || "Failed to resend OTP" };
    }
}