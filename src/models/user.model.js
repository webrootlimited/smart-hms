
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Allowed roles
const ROLES = ['admin', 'doctor', 'nurse', 'receptionist', 'billing_officer', 'patient'];

const userSchema = new Schema({
    // Core identity
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dob: { type: Date },
    profilePic: { type: String },

    // Roles
    role: { type: String, enum: ROLES, default: "patient", required: true },
    status: { type: String, enum: ['active', "pending", "suspended", "deleted"], default: 'active' },

    // OTP fields
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },

    // Verification & Security
    emailVerifiedAt: { type: Date },
    phoneVerifiedAt: { type: Date },
    mfaEnabled: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },

    // References to role-specific profiles
    patientProfile: { type: Schema.Types.ObjectId, ref: 'PatientProfile' },
    doctorProfile: { type: Schema.Types.ObjectId, ref: 'DoctorProfile' },
    staffProfile: { type: Schema.Types.ObjectId, ref: 'StaffProfile' },

}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

