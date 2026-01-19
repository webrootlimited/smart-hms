const mongoose = require("mongoose");
const { Schema } = mongoose;

const staffProfileSchema = new Schema({
    staffType: {
        type: String,
        enum: ['receptionist', 'nurse', 'billing_officer'],
        required: true
    },

    employeeId: {
        type: String,
        unique: true,
        required: true
    },

    workLocation: {
        clinic: {
            type: Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true
        },
        department: {
            type: String,
            default: ""
        }
    },

    employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract'],
        default: 'full-time'
    },

    shift: {
        type: String,
        enum: ['morning', 'evening', 'night'],
        default: 'morning'
    },

    status: {
        type: String,
        enum: ['active', 'on_leave', 'suspended'],
        default: 'active'
    },

    nurseDetails: {
        assignedDoctors: [{
            type: Schema.Types.ObjectId,
            ref: 'Doctor'
        }],
        ward: String,
        canAssistProcedures: Boolean,
        canAdministerMedication: Boolean
    },

    billingOfficerDetails: {
        canHandleInsurance: Boolean,
        maxDiscountAllowed: Number
    },

    receptionDetails: {
        deskNumber: String,
        languagesSpoken: [String]
    },

    permissions: [String]

}, { timestamps: true });

module.exports = mongoose.models.StaffProfile || mongoose.model('StaffProfile', staffProfileSchema);
