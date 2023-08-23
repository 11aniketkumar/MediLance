import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    details: mongoose.Schema.Types.ObjectId
});

export const user = mongoose.model("User", userSchema);

const patientSchema = mongoose.Schema({
    name: String,
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
    name: String,
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