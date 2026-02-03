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
        String
    ],
    visitType: {
        type: String,
        enum: ['In-Clinic', 'Telehealth', 'Both'],
        default: 'Both',
    },
    preVisitForms: [
        String
    ],
    eligibleDoctors: [
        { type: Schema.Types.ObjectId, ref: 'DoctorProfile' }
    ],
    fee: {
        currency: { type: String, default: 'USD' },
        amount: { type: Number, default: 0 },
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
},
    { timestamps: true }
);

export default mongoose.models.AppointmentType || mongoose.model('AppointmentType', AppointmentTypeSchema);
