import { user } from "../models/user.js";

export const getUserAccount = async(req,res)=>{
    const { email, password } = req.body;

    const data = await user.findOne({ email, password });
    
    if(data) {
        const userId = data._id.toString();

        res.cookie("token", userId, {
            httpOnly: true,
            expires: new Date(Date.now() + 7*24*60*60*1000)
        });

        if(data.role === "doctor") {
            res.redirect("/doctor/home");
        } else {
            res.redirect("/patient/home");
        }
    } else {
        res.send("Invalid Input");
    }
}


export const isLoggedIn = (req, res, next) =>{
    const { token } = req.cookies;

    if(token) {
        next();
    } else {
        res.redirect("/login_registration");
    }
}