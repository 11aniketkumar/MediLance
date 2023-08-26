import express from "express";
import { user } from "../models/user.js";
import { isLoggedIn } from "../controllers/login.js";
import { savePatientPost } from "../controllers/patientPost.js";

const router = express.Router();

router.get("/home", isLoggedIn, async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Patient'
                                                        });
    const name = data.details.name;

    res.render("patient_home", { name, specilization:"User" });
});

router.get("/profile", async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Patient'
                                                        });
    const email = data.email;
    const name = data.details.name;
    const phone = data.details.phone;
    const raw_dob = data.details.dob;

    const dobISO = raw_dob.toISOString(); // Convert to ISO 8601 string format
    const dob = dobISO.split("T")[0];


    res.render("patient_profile", { name, email, phone, dob, specilization:"User" });
});

router.get("/patient_doctors", isLoggedIn, async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Patient'
                                                        });
    const name = data.details.name;

    res.render("patient_doctors", { name, specilization:"user" });
});

router.get("/post", isLoggedIn, (req,res)=>{
    res.render("patient_post");
});

router.post("/addPost", isLoggedIn, savePatientPost);

router.get("/appointment", isLoggedIn, async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Patient'
                                                        });
    const name = data.details.name;
    res.render("patient_appointment", { name, specilization:"User" });
});


export default router;