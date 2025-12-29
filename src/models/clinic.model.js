import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
    {
        name: String,
        timezone: String,

        address: {
            line1: String,
            city: String,
            state: String,
            postcode: String,
            country: String,
        },

        workingHours: Object,
        publicHolidays: [Date],

        nhsOrgCode: String,
    },
    { timestamps: true }
);

export default mongoose.models.Clinic ||
    mongoose.model("Clinic", clinicSchema);
