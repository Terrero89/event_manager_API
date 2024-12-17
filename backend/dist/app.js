"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// var createError = require('http-errors');
require("dotenv").config();
// const express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
const logger = require('morgan');
// import {eventRoutes} from './routes/event-route';
const app = (0, express_1.default)();
app.use(logger('dev'));
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }));
// global middleware
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path, +' ' + req.url);
    next();
});
// app.use("/api/v1/", eventRoutes); // home route
app.get(`/api/v1/events`, (req, res) => {
    res.json({ message: 'Welcome to the event APIiiiiidsds!' });
});
app.get('/', (req, res) => {
    res.send("COOL");
});
app.listen(8080, '127.0.0.1', () => console.log(`Server running on http://localhost:${process.env.PORT}/api/v1/`));
module.exports = app;
