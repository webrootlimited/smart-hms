import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
        },
        payerName: String,
        planName: String,
        memberId: String,
        eligibilityStatus: String,
        verifiedAt: Date,
    },
    { timestamps: true }
);

export default mongoose.models.Insurance ||
    mongoose.model("Insurance", insuranceSchema);
