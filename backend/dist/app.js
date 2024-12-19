"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_route_1 = __importDefault(require("./routes/event-route"));
const task_routes_1 = __importDefault(require("./routes/task-routes"));
const users_routes_1 = __importDefault(require("./routes/users-routes"));
const global_1 = require("./config/global");
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// global middleware
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path, +' ' + req.url);
    next();
});
// ROUTES 
app.use("/api/v1/", event_route_1.default); // home route
app.use("/api/v1/", task_routes_1.default); // home route
app.use("/api/v1/", users_routes_1.default); // home route
app.listen(global_1.CONFIG.PORT, () => console.log(`Server running on http://localhost:${global_1.CONFIG.PORT}/api/v1/`));
module.exports = app;
