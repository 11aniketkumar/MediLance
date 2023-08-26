import express from 'express';
import path from 'path';
import cookieParser from "cookie-parser";
import { connectDB } from './data/database.js';
import { checkPassword, isRegistered, saveUserAccount } from './controllers/register.js';
import userRouter from './routes/user.js';
import doctorRouter from './routes/doctor.js';
import patientRouter from './routes/patient.js';
import appointmentRouter from './routes/appointment.js';
import { getUserAccount } from './controllers/login.js';

import http from 'http';
import { Server } from 'socket.io';

connectDB;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine","ejs");

const users = {};

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(userRouter);
app.use(appointmentRouter);
app.use("/doctor",doctorRouter);
app.use("/patient",patientRouter);

io.on('connection', (socket) => {
    console.log("new user");
    socket.on('new-user', username=>{
        users[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
    })
    socket.on('send-chat-message', message=>{
        socket.broadcast.emit('chat-message', {message: message, sender: users[socket.id]});
    })
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    })
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.get("/", (req,res)=>{
    res.render("landing");
});

app.get("/login_registration", (req, res)=>{
    res.render("login_registration");
});

app.post("/register", checkPassword, isRegistered, saveUserAccount);

app.post("/login", getUserAccount);
