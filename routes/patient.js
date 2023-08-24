import express from "express";
import { user } from "../models/user.js";

const router = express.Router();

router.get("/home", async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Patient'
                                                        });
    const name = data.details.name;

    res.render("patient_home", { name, specilization:"User" });
});

router.get("/profile", (req,res)=>{
    res.render("patient_profile");
});

export default router;