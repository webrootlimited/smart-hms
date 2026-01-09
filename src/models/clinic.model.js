import mongoose from 'mongoose';


const daySchema = {
    open: { type: Boolean, default: false },
    from: { type: String, default: "" },
    to: { type: String, default: "" }
};

const clinicSchema = new mongoose.Schema({
    // Basic Info
    clinicName: { type: String, required: true, trim: true },
    clinicCode: { type: String, required: true, unique: true },
    clinicType: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    // Contact
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    emergencyContact: { type: String },

    // Address
    country: { type: String },
    city: { type: String, required: true },
    area: { type: String, required: true },
    postalCode: { type: String },
    fullAddress: { type: String, required: true },

    // Location
    latitude: { type: Number },
    longitude: { type: Number },

    // operating hours
    operatingHours: {
        Monday: daySchema,
        Tuesday: daySchema,
        Wednesday: daySchema,
        Thursday: daySchema,
        Friday: daySchema,
        Saturday: daySchema,
        Sunday: daySchema,
    },

    // Facilities & Services
    facilities: { type: [String] },
    services: { type: [String] },

    // Assigned doctors with room numbers and fee overrides
    assignedDoctors: {
        type: [
            {
                doctorId: { type: String, required: true },
                roomNumber: { type: String, default: '' },
                feeOverride: { type: String, default: '' },
            }
        ],
        default: []
    },

}, { timestamps: true });

const Clinic = mongoose.models.Clinic || mongoose.model('Clinic', clinicSchema);

export default Clinic;
