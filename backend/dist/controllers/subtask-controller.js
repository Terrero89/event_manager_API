"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsController = exports.getHomeController = void 0;
const events = [{ name: 'click', type: 'click' }, { name: 'hover', type: 'hover' }];
const logger = require('morgan');
const getHomeController = (req, res) => {
    res.send("GET HOME PAGE");
};
exports.getHomeController = getHomeController;
const getEventsController = (req, res) => {
    res.status(200).json({ events });
};
exports.getEventsController = getEventsController;
module.exports = {
    getHomeController: exports.getHomeController,
    getEventsController: exports.getEventsController
};
