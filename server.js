import express from 'express';
import path from 'path';
import cookieParser from "cookie-parser";
import { connectDB } from './data/database.js';
import { checkPassword, isRegistered, saveUserAccount } from './controllers/register.js';
import userRouter from './routes/user.js';

connectDB;

const app = express();

app.listen(5000, ()=>{
    console.log("Server started!");
});

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(userRouter);

app.set("view engine","ejs");

app.get("/", (req,res)=>{
    res.render("landing");
});

app.get("/login_registration", (req, res)=>{
    res.render("login_registration");
});

app.post("/register", checkPassword, isRegistered, saveUserAccount);

