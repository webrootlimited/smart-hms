import mongoose from "mongoose";

async function connectToDb() {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
        // already connected
        return mongoose.connection;
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable in .env.local"
        );
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("✅ MongoDB connected successfully");
        return conn;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
}

export default connectToDb;
