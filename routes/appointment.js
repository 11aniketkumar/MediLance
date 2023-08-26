import express from "express";
import { appointment } from "../models/appointment.js";
// import { user } from "../models/user.js";

const router = express.Router();

router.post("/addAppointment", (req,res)=>{
    const doctor_id = req.body.doctor;

    res.render("appointment", { doctor:doctor_id });
});


router.post("/saveAppointment", async (req, res) => {
    const { token } = req.cookies;
    const { doctor, appointment_date, appointment_time, post } = req.body;
    const combinedDateTime = `${appointment_date}T${appointment_time}:00Z`;
    const appointmentDateTime = new Date(combinedDateTime);

    await appointment.create({
        doctor: doctor,
        patient: token,
        content: post,
        status: "Pending",
        timeStamp: appointmentDateTime
    });
    res.redirect("/patient/patient_doctors");
});

router.get("/getDoctorAppointments", async (req, res) => {
    const { token } = req.cookies;

    // on doctor's appointment page, i know doctor name
    // need to find patient details
    const appointments = await appointment.find({ doctor:token })
            .populate({
                path: 'patient',
                populate: {
                    path: 'details',
                    model: 'Patient'
                    }
            });
    res.json(appointments);
});

router.get("/getPatientAppointments", async (req, res) => {
    const { token } = req.cookies;

    // on patient's appointment page, i know patient name
    // need to find doctor details
    const appointments = await appointment.find({ patient:token })
            .populate({
                path: 'doctor',
                populate: {
                    path: 'details',
                    model: 'Doctor'
                    }
            });
    res.json(appointments);
});

export default router;

