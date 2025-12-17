import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        dob: { type: Date, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        otp: { type: String },
        otpExpiry: { type: Date },
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        address: { type: String },
        profilePicture: { type: String },
        bloodType: { type: String },
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt
    }
);

const Patient = mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default Patient;
