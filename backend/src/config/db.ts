import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI as string;

        await mongoose.connect(uri);

        console.log("🟢 MongoDB conectado correctamente");
    } catch (err) {
        console.error("🔴 Error al conectar MongoDB:", err);
        process.exit(1);
    }
};
