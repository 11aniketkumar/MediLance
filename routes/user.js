import express from "express";
import { user } from "../models/user.js";

const router = express.Router();

router.get("/users", async(req,res)=>{
    const data = await user.find();
    res.json(data);
});

// router.get('/user/:userId', async (req, res) => {
//     const userId = req.params.userId;

//     const userDetails = await user.findById(userId);
//     res.json(userDetails);
// });

export default router;