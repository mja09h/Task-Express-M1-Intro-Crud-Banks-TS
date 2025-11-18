import mongoose from "mongoose";
import { DB_URI } from "./app";

const connectDB = async () => {
    try {
        const connnection = await mongoose.connect(DB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }
};

export default connectDB;