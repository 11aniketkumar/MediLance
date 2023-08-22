import mongoose from "mongoose";

export const connectDB = mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "backend"
})
.then(()=>console.log("Database connected successfully!"))
.catch((e)=>console.log(e));