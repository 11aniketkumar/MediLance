import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    post: String,
    details: mongoose.Schema.Types.ObjectId
});

export const user = mongoose.model("User", userSchema);

const patientSchema = mongoose.Schema({
    name: String,
    phone: String,
    dob: Date,
    gender: String,
    location: String,
    consult: Number,
    report: Number
});

export const patient = mongoose.model("Patient", patientSchema);

const doctorSchema = mongoose.Schema({
    name: String,
    phone: String,
    dob: Date,
    gender: String,
    location: String,
    rating: Number,
    cases: Number
});

export const doctor = mongoose.model("Doctor", doctorSchema);