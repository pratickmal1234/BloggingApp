import mongoose from "mongoose";

const bloggingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, contain: {
        type: String,
        required: true
    }, photo: {
        type: String,
        required: true
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            text:{  type:String,
            required: true,},
            createdAt: { type: Date, default: Date.now }
        }
    ]

}, { timestamps: true })

export default mongoose.model("dlogging", bloggingSchema)