import mongoose from "mongoose";

const bloggingSchema=new mongoose.Schema({
    contain:{
        type:String,
        required:true
    },photo:{
        type:String,
        required:true
    }, createdAtAt: {
        type: Date,
        default: Date.now()
    },userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    },
},{timestamps:true})

export default mongoose.model("dlogging",bloggingSchema)