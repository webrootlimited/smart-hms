"use server"

import connectToDb from "@/lib/connectToDb";

export async function checkConnection() {
    const db = await connectToDb();
    console.log("MongoDB readyState:", db?.connection?.readyState);
}
