const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorProfileSchema = new Schema(
    {
        providerType: {
            type: String,
            enum: ['doctor', 'therapist'],
            default: 'doctor',
        },

        yearsOfExperience: Number,
        consultationFee: Number,
        bio: String,
        employmentStatus: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], default: 'Full-time' },


        assistants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Staff'
            }
        ],

        /* Medical License */
        medicalLicense: {
            licenseNumber: String,
            status: { type: String, enum: ['Active', 'Suspended', 'Pending'] },
            expiryDate: Date,
            issuedAt: Date,
            documentUrl: String
        },

        /* Certifications (Includes Board Certifications) */
        certifications: [
            {
                type: {
                    type: String,
                    enum: ['Board', 'Certification'],
                    required: true
                },

                title: String,            // e.g. Cardiology, Internal Medicine
                organization: String,     // e.g. PMC, ABIM, CPSP (Board / Issuer)
                licenseNumber: String,    // mainly for Board certifications

                status: {
                    type: String,
                    enum: ['Active', 'Suspended', 'Expired', 'Pending'],
                },

                issuedAt: Date,
                expiryDate: Date,

                documentUrl: String
            }
        ],


        /* DEA Certificate */
        deaCertificate: {
            deaNumber: String,
            status: { type: String, enum: ['Active', 'Expired', 'Pending'] },
            expiryDate: Date,
            issuedAt: Date,
            documentUrl: String
        },

        /* Malpractice Insurance Certificate */
        malpracticeInsuranceCertificate: {
            policyNumber: String,

            insuranceProvider: String, // e.g. Allianz, AXA, State Life

            coverageAmount: String, // e.g. "$1M per claim" or "PKR 10 Million"

            status: {
                type: String,
                enum: ['Active', 'Expired', 'Pending'],
            },

            issuedAt: Date,
            expiryDate: Date,

            documentUrl: String
        },


        digitalSignature: {
            documentUrl: String
        },

        specialities: [String],

        telehealthEnabled: {
            type: Boolean,
            default: false
        },

        employeeId: {
            type: String,
            required: true,
            unique: true
        },

        startDate: Date,

        /* ✅ LOCATION-BASED SCHEDULE (EMBEDDED) */
        workLocations: {
            type: [
                {
                    clinic: {
                        type: Schema.Types.ObjectId,
                        ref: 'Clinic',
                        required: true
                    },

                    department: {
                        type: String,
                        default: ""
                    },

                    schedule: {
                        type: [
                            {
                                day: {
                                    type: String,
                                    enum: [
                                        'Monday',
                                        'Tuesday',
                                        'Wednesday',
                                        'Thursday',
                                        'Friday',
                                        'Saturday',
                                        'Sunday'
                                    ],
                                    required: true
                                },
                                open: { type: Boolean, default: false },
                                from: { type: String, default: "" },
                                to: { type: String, default: "" },
                                break: {
                                    from: { type: String, default: "" },
                                    to: { type: String, default: "" }
                                }
                            }
                        ],
                        default: []
                    }
                }
            ],
            default: []
        },

        slotDuration: {
            type: Number,
            default: 15
        },

        patients: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Patient'
                }
            ],
            default: []
        }

    },
    { timestamps: true }
);

module.exports =
    mongoose.models.DoctorProfile ||
    mongoose.model('DoctorProfile', doctorProfileSchema);
