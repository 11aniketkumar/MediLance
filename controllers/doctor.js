import { user } from "../models/user.js";


export const getAllDoctors = async (req, res) => {
    const data = await user.find()
                .populate({
                    path: 'details',
                    model: 'Doctor'
                    });
    const doctors = data.filter(user => user.role === 'doctor');

    res.json(doctors);
};