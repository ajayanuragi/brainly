import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config";
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("connected to mongodb");
        return true
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message)
        return false
    }
} 