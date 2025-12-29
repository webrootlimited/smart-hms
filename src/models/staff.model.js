const mongoose = require('mongoose');
const { Schema } = mongoose;

const staffProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    staffType: { type: String, enum: ['receptionist', 'nurse', 'billing_officer'], required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
    employmentType: { type: String, enum: ['full-time', 'part-time', 'contract'], default: 'full-time' }
}, { timestamps: true });

module.exports = mongoose.models.StaffProfile || mongoose.model('StaffProfile', staffProfileSchema);
