import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        actorId: String,
        actorType: String,

        action: String,
        resourceType: String,
        resourceId: String,

        ipAddress: String,
    },
    { timestamps: true }
);

export default mongoose.models.AuditLog ||
    mongoose.model("AuditLog", auditLogSchema);
