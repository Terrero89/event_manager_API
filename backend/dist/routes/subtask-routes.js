"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subtask_controller_1 = require("../controllers/subtask-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get('/', subtask_controller_1.getHomeController); // home route
router.get('/tasks', subtask_controller_1.getEventsController); // get all events route
exports.default = router;
