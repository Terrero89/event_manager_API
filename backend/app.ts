import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './routes/event-route';
import taskRoutes from './routes/task-routes';
import usersRoutes from './routes/users-routes';
import { CONFIG } from './config/global';
require("dotenv").config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global middleware
app.use((req: Request, res: Response, next: any ) => {
    console.log(req.method + ' ' + req.path,  + ' ' + req.url );
    next();
});
// ROUTES 
app.use("/api/v1/", eventRoutes); // home route
app.use("/api/v1/", taskRoutes); // home route
app.use("/api/v1/", usersRoutes); // home route


app.listen(CONFIG.PORT, () => console.log(`Server running on http://localhost:${CONFIG.PORT}/api/v1/`));








module.exports = app;
