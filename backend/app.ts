import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { CONFIG } from './config/global';
import eventsRoutes from './routes/events-routes';
import storyRoutes from './routes/story-routes';
import usersRoutes from './routes/users-routes';
import authRoutes from './routes/auth-routes';
import notesRoutes from './routes/notes-routes';
import meetingRoutes from './routes/meetings-routes';
import sprintRoutes from './routes/sprint-routes';
import cors = require('cors');
// import dotenv from "dotenv";
// import path = require('path');
require("dotenv").config();

const mongoose = require('mongoose');
const app: Express = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'https://myfrontenddomain.com'], // Multiple domains
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specific methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Custom headers
//     exposedHeaders: ['Authorization'], // Headers exposed to the client
//     credentials: true, // Allow cookies
//     maxAge: 600, // Cache preflight response for 10 minutes
//   })
// );eventskRoutes
// global middleware
app.use((req: Request, res: Response, next: express.NextFunction) => {
    console.log(`${req.method} ${req.path} ${req.url}`);
    next();
});

// ROUTES 
app.use("/api/v1/auth", authRoutes); // user auth
app.use("/api/v1/", storyRoutes); // home route
app.use("/api/v1/", usersRoutes); // home route
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/", eventsRoutes); // home route
app.use("/api/v1/", meetingRoutes);
app.use("/api/v1/", sprintRoutes);


mongoose.connect(CONFIG.MONGODB_URL).then(() => {
    console.log('Connected MongoDB...');
}).catch((error: Error) => console.log(error));
app.listen(CONFIG.PORT, () => console.log(`Server running on http://localhost:${CONFIG.PORT}/api/v1/`));








module.exports = app;