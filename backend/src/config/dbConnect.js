import mongoose from "mongoose";
export async function dbConnect() {
    try {
        await mongoose.connect(process.env.url)
        console.log("the db is  connected");
    } catch (error) {
        console.log("the db is not connected");

    }
}