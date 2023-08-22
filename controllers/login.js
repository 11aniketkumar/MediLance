import { user } from "../models/user.js";


export const getUserAccount = async(req,res)=>{
    const { email, password } = req.body;

    const data = await user.findOne({ email, password });
    
    if(data) {
        res.send("success");
    } else {
        res.send("Invalid Input");
    }
}