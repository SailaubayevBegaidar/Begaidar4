import express from 'express';

import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const appServer = express();

appServer.use(express.json());
appServer.use('/users', userRoutes);
appServer.use('/tasks', taskRoutes);

const serverPort = process.env.PORT || 5000;

const initializeServer = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB подключен");
        appServer.listen(serverPort, () => {
            console.log(`Сервер запущен на порту ${serverPort}`);
        })
    } catch(error) {
        console.log(error);
    }
}

initializeServer();

