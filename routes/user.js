import express from "express";
import { user } from "../models/user.js";

const router = express.Router();

router.get("/users", async(req,res)=>{
    const data = await user.find();
    res.json(data);
});

router.get("/signout", (req, res)=>{
    const { token } = req.cookies;

    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.redirect("/");
});

router.get("/chat", (req, res)=>{
    res.render("chat");
})

export default router;