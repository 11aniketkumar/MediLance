import express from "express";
import { getAllPosts, savePost } from "../controllers/post.js";
import { user } from "../models/user.js";
import { isLoggedIn } from "../controllers/login.js";
import { getAllDoctors } from "../controllers/doctor.js";
import { getAllPatientPosts } from "../controllers/patientPost.js";

const router = express.Router();

router.get("/home", isLoggedIn, async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Doctor'
                                                        });
    const name = data.details.name;

    res.render("doctor_home", { name, specilization:"doctor" });
});

router.get("/patient", isLoggedIn, async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Doctor'
                                                        });
    const name = data.details.name;

    res.render("doctor_patient", { name, specilization:"doctor" });
});

router.get("/post", isLoggedIn, (req,res)=>{
    res.render("user_post");
});

router.post("/addPost", isLoggedIn, savePost);

// api used by home page
router.get("/posts", getAllPosts);

// api used by doctor_patient page
router.get("/patient_posts", getAllPatientPosts);

// api used by patient_doctor page
router.get("/allDoctors", getAllDoctors);

router.get("/profile", async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Doctor'
                                                        });
    const email = data.email;
    const name = data.details.name;
    const phone = data.details.phone;
    const raw_dob = data.details.dob;

    const dobISO = raw_dob.toISOString(); // Convert to ISO 8601 string format
    const dob = dobISO.split("T")[0];


    res.render("doctor_profile", { name, email, phone, dob, specilization:"Doctor" });
});

router.get("/appointment", isLoggedIn, async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Doctor'
                                                        });
    const name = data.details.name;
    res.render("doctor_appointment", { name, specilization:"User" });
});

export default router;

