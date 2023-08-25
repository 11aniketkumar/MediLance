import mongoose from "mongoose";

const patientPostSchema = new mongoose.Schema({
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
    preferred_deadline: {
        type: Number,
        default: 7
    }
});

export const patient_post = mongoose.model("Patient_Posts", patientPostSchema);