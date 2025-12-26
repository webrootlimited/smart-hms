const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    patientId: { type: String, required: true, unique: true },
    nhsNumber: { type: String },           // UK
    ssnEncrypted: { type: String },        // US
    insurance: {
        provider: String,
        plan: String,
        memberId: String
    },
    primaryGP: String,
    emergencyContact: {
        name: String,
        phone: String,
        relation: String
    },
    address: {
        line1: String,
        city: String,
        postcode: String,
        country: String
    },
    preferredLanguage: String
}, { timestamps: true });

module.exports = mongoose.model('PatientProfile', patientProfileSchema);
