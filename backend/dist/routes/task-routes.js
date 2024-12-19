"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get('/tasks', task_controller_1.getTasksController); // get all events route
exports.default = router;
