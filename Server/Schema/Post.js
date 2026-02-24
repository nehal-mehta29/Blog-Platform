import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, //Stores MongoDB ObjectId
            ref: "User",
            required: true
        }
    },
    {timestamps: true}   //Adds timestamp of the post
)

export default mongoose.model("Post", postSchema);