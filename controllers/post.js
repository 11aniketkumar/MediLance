import { user_post } from "../models/post.js"
import { user } from "../models/user.js";

export const savePost = async(req,res)=>{
    const { content } = req.body;
    const { token } = req.cookies;

    const userData = await user.findOne({ _id: token });

    user_post.create({
        userId: userData._id,
        content
    });

    res.redirect("/doctor/home");
};

export const getAllPosts = async (req, res) => {
    const data = await user_post.find()
            .populate({
                path: 'userId',
                populate: {
                    path: 'details',
                    model: 'Doctor'
                    }
            });

    res.json(data);
};
