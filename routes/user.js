import express from "express";
import { user } from "../models/user.js";

const router = express.Router();

router.get("/users", async(req,res)=>{
    const data = await user.find();
    res.json(data);
});

export default router;