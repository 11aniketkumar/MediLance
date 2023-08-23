import express from "express";
import { user_post } from "../models/post.js";
import { user } from "../models/user.js";

const router = express.Router();

router.get("/home", (req,res)=>{
    res.render("doctor_home");
});

router.get("/post", (req,res)=>{
    res.render("user_post");
});

router.post("/addPost", async(req,res)=>{
    const { content } = req.body;
    const { token } = req.cookies;

    const userData = await user.findOne({ _id: token });

    user_post.create({
        userId: userData._id,
        content
    });

    res.send("success");
});

export default router;
