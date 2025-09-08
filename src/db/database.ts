import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI!}/first-nextjs-app`);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MonogDB connected || DB Host: ", connection.host);
        });

        connection.on('error', (err) => {
            console.log("MongoDB connection error. Please make sure mongodb is running: ", err);
            process.exit(1);
        });

    } catch (err) {
        console.log("Something went wrong");
        console.error(err);
    }
}