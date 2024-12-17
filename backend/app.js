// var createError = require('http-errors');
require("dotenv").config();
const express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
const logger = require('morgan');
const eventRoutes = require("./routes/event-route");


const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global middleware
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path, + ' ' + req.ip);
    next();
});
app.use("/api/v1/", eventRoutes); // home route




app.listen(process.env.PORT, '127.0.0.1', () => console.log(`Server running on http://localhost:${process.env.PORT}/api/v1/`));







module.exports = app;
