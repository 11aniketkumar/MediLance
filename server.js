import express from 'express';
import path from 'path';
import cookieParser from "cookie-parser";
import { connectDB } from './data/database.js';
import { doctor, patient, user } from './models/user.js';

connectDB;

const app = express();

app.listen(5000, ()=>{
    console.log("Server started!");
});

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.set("view engine","ejs");

app.get("/", (req,res)=>{
    res.render("landing");
});

app.get("/login_registration", (req, res)=>{
    res.render("login_registration");
});

app.post("/register", async(req,res)=>{
    const {name, email, phone, dob, password, c_password, post} = req.body;
    let id = 5;

    // TODO :: CHECK FOR ALREADY EXISTING USER
    // TODO :: COMPARE PASSWORD AND CONFIRM PASSWORD

    if(post === "doctor") {
        id = await doctor.create({
            name,
            phone,
            dob,
            gender: null,
            location: null,
            rating: null,
            cases: null
        });
    } else {
        id = await patient.create({
            name,
            phone,
            dob,
            gender: null,
            location: null,
            consult: 0,
            report: 0
        });
    }

    user.create({
        email,
        password,
        post,
        details: id
    });

    res.send("done");
});
