"use server";

import connectToDb from "@/lib/connectToDb";
import Patient from "@/models/patient.model";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/mailer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Register a new patient
export async function registerPatient(data) {
    try {
        await connectToDb();

        const { fullName, dob, phoneNumber, email, password, gender } = data;

        // Check if patient exists
        const existing = await Patient.findOne({ email });
        if (existing) throw new Error("Email already registered");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const patient = await Patient.create({
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

        return { success: true, message: "Patient registered. Please verify OTP.", patientId: patient._id };
    } catch (err) {
        console.error("❌ Register error:", err);
        return { success: false, message: err.message || "Registration failed" };
    }
}

//  Verify OTP
export async function verifyOtp(patientId, otpInput) {
    try {
        await connectToDb();

        const patient = await Patient.findById(patientId);
        if (!patient) throw new Error("Patient not found");

        if (patient.isVerified) {
            // Already verified -> generate JWT if not already set
            const payload = { id: patient._id, email: patient.email };
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

            return { success: true, message: "Already verified, JWT issued", patientId: patient._id };
        }

        if (!patient.otp || !patient.otpExpiry) throw new Error("OTP not generated");

        if (new Date() > patient.otpExpiry) throw new Error("OTP expired");

        if (otpInput !== patient.otp) throw new Error("Invalid OTP");

        // Mark as verified
        patient.isVerified = true;
        patient.otp = null;
        patient.otpExpiry = null;
        await patient.save();

        // Generate JWT token
        const payload = { id: patient._id, email: patient.email };
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

        return { success: true, message: "OTP verified and logged in successfully", patientId: patient._id };
    } catch (err) {
        console.error("❌ OTP verify error:", err.message);
        return { success: false, message: err.message || "OTP verification failed" };
    }
}

// Login Patient
export async function loginPatient(email, password) {
    try {
        await connectToDb();

        const patient = await Patient.findOne({ email });
        if (!patient) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) throw new Error("Invalid credentials");

        // Not verified -> send OTP
        if (!patient.isVerified) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

            patient.otp = otp;
            patient.otpExpiry = otpExpiry;
            await patient.save();

            await sendOtpEmail(email, otp);

            return { success: false, message: "Please verify your OTP. OTP sent to email.", patientId: patient._id };
        }

        // Verified -> generate JWT
        const payload = { id: patient._id, email: patient.email };
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

        return { success: true, message: "Login successful", patientId: patient._id };
    } catch (err) {
        console.error("❌ Login error:", err);
        return { success: false, message: err.message || "Login failed" };
    }
}

// Resend OTP
export async function resendOtp(patientId) {
    try {
        await connectToDb();
        const patient = await Patient.findById(patientId);
        if (!patient) throw new Error("Patient not found");

        if (patient.isVerified) return { success: false, message: "Already verified" };

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        patient.otp = otp;
        patient.otpExpiry = otpExpiry;
        await patient.save();

        await sendOtpEmail(patient.email, otp);

        return { success: true, message: "OTP resent successfully" };
    } catch (err) {
        console.error("❌ Resend OTP error:", err);
        return { success: false, message: err.message || "Failed to resend OTP" };
    }
}