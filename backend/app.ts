import express, { Express, Request, Response } from 'express';
import { CONFIG } from './config/global';
import authRoutes from './routes/auth-routes';
import eventsRoutes from './routes/events-routes';
import meetingRoutes from './routes/meetings-routes';
import notesRoutes from './routes/notes-routes';
import sprintRoutes from './routes/sprint-routes';
import standupRoutes from './routes/standups-routes';
import storyRoutes from './routes/story-routes';
import timeoffRoutes from './routes/timeoff-routes';
import usersRoutes from './routes/users-routes';

import cors = require('cors');
require("dotenv").config();

const mongoose = require('mongoose');
const app: Express = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow localhost for development
            if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
                callback(null, true);
            }
            // Allow deployed frontend URLs
            else if (origin && (origin.includes('https://eventmanagerapi-dev.up.railway.app') || origin.includes('netlify.app') || origin.includes('railway.app'))) {
                callback(null, true);
            }
            // Fallback: allow all origins (use with caution in production)
            else {
                callback(null, true);
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Authorization'],
        credentials: true,
        maxAge: 3600, // Cache preflight response for 1 hour
    })
);
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