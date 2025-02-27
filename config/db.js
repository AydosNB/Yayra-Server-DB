import mongoose from "mongoose";


export const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.LOCAL_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error : ${error}`)
        process.exit(1);
    }
}