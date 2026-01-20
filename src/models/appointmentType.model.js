import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AppointmentTypeSchema = new Schema({
    typeName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    duration: {
        type: String,
        required: true,
    },
    requiredDocuments: [
        {
            name: { type: String, required: true },
            icon: { type: String },
        },
    ],
    visitType: {
        type: String,
        enum: ['In-Clinic', 'Telehealth', 'Both'],
        default: 'Both',
    },
    preVisitForms: [
        {
            name: { type: String, required: true },
            isRequired: { type: Boolean, default: true },
        },
    ],
    eligibleProviders: [
        {
            providerId: { type: String, required: true },
            name: { type: String, required: true },
            specialty: { type: String },
        },
    ],
    fee: {
        currency: { type: String, default: 'USD' },
        amount: { type: Number, default: 0 },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.AppointmentType || mongoose.model('AppointmentType', AppointmentTypeSchema);
