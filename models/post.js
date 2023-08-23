import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
});

export const user_post = mongoose.model("Posts", postSchema);