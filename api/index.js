import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import bookingRoute from "./routes/booking.js";
import cookieParser from 'cookie-parser';

import cors from 'cors';
const app = express();
dotenv.config();


//connect to database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Successfully connected to database');
    } catch (error) {
        handleError(error);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
});


//middlewares
//middleware for parsing json data from request body
app.use(cookieParser())
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/booking", bookingRoute);



app.use((err,req,res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use((Req, res, next) => {
    console.log("this is middleware")
})
app.listen(8000, () =>{
    connect();
    console.log('Server running on port 8000!');
});
