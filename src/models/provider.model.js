const mongoose = require('mongoose');
const { Schema } = mongoose;

const providerProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerType: { type: String, enum: ['doctor', 'therapist'], required: true },
    license: {
        number: String,
        country: String
    },
    specialties: [String],
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    telehealthEnabled: { type: Boolean, default: false },
    acceptingNewPatients: { type: Boolean, default: true },
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
}, { timestamps: true });

module.exports = mongoose.model('ProviderProfile', providerProfileSchema);
