import mongoose from "mongoose";

const scissonSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }, issuedAt: {
        type: Date,
        default: Date.now()
    }
},{timestamps:true})

export default mongoose.model("scisson",scissonSchema)