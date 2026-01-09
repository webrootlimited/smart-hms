const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = {
    open: { type: Boolean, default: false },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    break: {
        from: { type: String, default: "" },
        to: { type: String, default: "" }
    }
};

const doctorProfileSchema = new Schema(
    {
        providerType: {
            type: String,
            enum: ['doctor', 'therapist'],
            default: "doctor",
            required: true
        },

        /* BASIC LICENSE (Country Based) */
        license: {
            number: { type: String },
            country: { type: String }
        },

        /* ✅ CERTIFICATIONS */
        certifications: {
            type: [
                {
                    title: { type: String, required: true },
                    organization: { type: String },
                    issuedDate: { type: Date },
                    expiryDate: { type: Date },
                    status: {
                        type: String,
                        enum: ['Active', 'Expired'],
                        default: 'Active'
                    },
                    documentUrl: { type: String }
                }
            ],
            default: []
        },

        /* ✅ MEDICAL LICENSE */
        medicalLicense: {
            licenseNumber: { type: String },
            status: {
                type: String,
                enum: ['Active', 'Inactive', 'Suspended'],
                default: 'Active'
            },
            verified: { type: Boolean, default: false },
            expiryDate: { type: Date }
        },

        /* ✅ DEA CERTIFICATE */
        deaCertificate: {
            deaNumber: { type: String },
            status: {
                type: String,
                enum: ['Valid', 'Expired'],
                default: 'Valid'
            },
            expiryDate: { type: Date }
        },

        specialities: {
            type: [String],
            required: true
        },

        telehealthEnabled: {
            type: Boolean,
            default: false
        },

        employeeId: {
            type: String,
            required: true,
            unique: true
        },

        startDate: {
            type: Date,
            required: true
        },

        /* WORK SCHEDULE */
        schedule: {
            Monday: daySchema,
            Tuesday: daySchema,
            Wednesday: daySchema,
            Thursday: daySchema,
            Friday: daySchema,
            Saturday: daySchema,
            Sunday: daySchema
        },

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
                    workingDays: {
                        type: [String],
                        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        default: []
                    }
                }
            ],
            default: []
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
