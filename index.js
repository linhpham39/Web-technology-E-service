import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';

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

app.use('/auth', authRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(8000, () =>{
    connect();
    console.log('Server running on port 8000!');
});

