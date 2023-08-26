import { doctor, patient, user } from '../models/user.js';

export const checkPassword = (req, res, next)=>{
    const{ password, c_password } = req.body;

    if(password === c_password) {
        next();
    } else {
        res.send("password mismatch!");
    }
}

export const isRegistered = async(req, res, next)=>{
    const{ email } = req.body;
    const data = await user.findOne({ email });

    if(data) {
        res.send("user already exists in database");
    } else {
        next();
    }
}

export const saveUserAccount = async(req,res)=>{
    const {name, email, phone, dob, password, c_password, role} = req.body;
    let id = 5;

    if(role === "doctor") {
        id = await doctor.create({
            name,
            phone,
            dob
        });
    } else {
        id = await patient.create({
            name,
            phone,
            dob
        });
    }

    await user.create({
        email,
        password,
        role,
        details: id
    });

    res.redirect("/login_registration");
}