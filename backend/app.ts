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
import standupRoutes from './routes/standups-routes';
import timeoffRoutes  from './routes/timeoff-routes';

import cors = require('cors');
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
app.use("/api/v1/stories", storyRoutes); // home route
app.use("/api/v1/", usersRoutes); // home route
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/events", eventsRoutes); 
app.use("/api/v1/meetings", meetingRoutes);
app.use("/api/v1/sprints", sprintRoutes);
app.use("/api/v1/standups", standupRoutes);
app.use("/api/v1/timeoff", timeoffRoutes);

mongoose.connect(CONFIG.MONGODB_URL).then(() => {
    console.log(`Connected Database ${mongoose.connection.name} in MongoDB`);
}).catch((error: Error) => console.log(error));
app.listen(CONFIG.PORT, () => console.log(`Server running on http://localhost:${CONFIG.PORT}/api/v1/`));








module.exports = app;