import { patient_post } from "../models/patient_post.js";
import { user } from "../models/user.js";


export const savePatientPost = async(req,res)=>{
    const { content } = req.body;
    const { token } = req.cookies;

    const userData = await user.findOne({ _id: token });

    patient_post.create({
        userId: userData._id,
        content
    });

    res.redirect("/patient/home");
};