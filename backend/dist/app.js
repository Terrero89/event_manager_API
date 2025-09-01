"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const global_1 = require("./config/global");
const events_routes_1 = __importDefault(require("./routes/events-routes"));
const story_routes_1 = __importDefault(require("./routes/story-routes"));
const users_routes_1 = __importDefault(require("./routes/users-routes"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const notes_routes_1 = __importDefault(require("./routes/notes-routes"));
const meetings_routes_1 = __importDefault(require("./routes/meetings-routes"));
const sprint_routes_1 = __importDefault(require("./routes/sprint-routes"));
const standups_routes_1 = __importDefault(require("./routes/standups-routes"));
const timeoff_routes_1 = __importDefault(require("./routes/timeoff-routes"));
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} ${req.url}`);
    next();
});
// ROUTES 
app.use("/api/v1/auth", auth_routes_1.default); // user auth
app.use("/api/v1/stories", story_routes_1.default); // home route
app.use("/api/v1/", users_routes_1.default); // home route
app.use("/api/v1/notes", notes_routes_1.default);
app.use("/api/v1/events", events_routes_1.default);
app.use("/api/v1/meetings", meetings_routes_1.default);
app.use("/api/v1/sprints", sprint_routes_1.default);
app.use("/api/v1/standups", standups_routes_1.default);
app.use("/api/v1/timeoff", timeoff_routes_1.default);
mongoose.connect(global_1.CONFIG.MONGODB_URL).then(() => {
    console.log(`Connected Database ${mongoose.connection.name} in MongoDB`);
}).catch((error) => console.log(error));
app.listen(global_1.CONFIG.PORT, () => console.log(`Server running on http://localhost:${global_1.CONFIG.PORT}/api/v1/`));
module.exports = app;
