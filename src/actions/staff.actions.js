"use server";
import User from "@/models/user.model";
import connectToDb from "@/lib/connectToDb";

export async function getStaff() {
    try {
        await connectToDb();
        const staff = await User.find({ role: "nurse" }).populate("staffProfile");
        console.log(staff);

        return { success: true, staff: JSON.parse(JSON.stringify(staff)) };
    } catch (err) {
        console.error("❌ Get staff error:", err);
        return { success: false, message: err.message || "Failed to get staff" };
    }
}