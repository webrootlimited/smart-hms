"use server";

import connectToDb from "@/lib/connectToDb";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Check session from JWT cookie
export async function checkSession() {
    try {
        await connectToDb();

        const tokenCookie = cookies().get("token");
        if (!tokenCookie) return null;

        const token = tokenCookie.value;

        // Verify JWT
        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.warn("❌ JWT invalid or expired:", err.message);
            return null;
        }

        // Fetch user info
        const user = await User.findById(payload.id).select("email, fullName");
        if (!user) return null;

        return { success: true, user };
    } catch (err) {
        console.error("❌ checkSession error:", err);
        return null;
    }
}
