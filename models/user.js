import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export const user = mongoose.model("User", userSchema);

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: String,
    dob: Date,
    gender: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    consult: {
        type: Number,
        default: 0
    },
    report: {
        type: Number,
        default: 0
    }
});

export const patient = mongoose.model("Patient", patientSchema);

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: String,
    dob: Date,
    gender: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        default: null
    },
    cases: {
        type: Number,
        default: 0
    }
});

export const doctor = mongoose.model("Doctor", doctorSchema);