"use server";

import User from "@/models/user.model";
import connectToDb from "@/lib/connectToDb.js";

export async function getPatients() {
    try {
        await connectToDb();
        const patients = await User.find({ role: "patient" }).populate("patientProfile");

        console.log(patients);

        return { success: true, patients: JSON.parse(JSON.stringify(patients)) };
    } catch (err) {
        console.error("❌ Get patients error:", err);
        return { success: false, message: err.message || "Failed to get patients" };
    }
}