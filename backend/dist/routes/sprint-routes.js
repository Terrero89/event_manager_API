"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sprint_controller_1 = require("../controllers/sprint-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/sprints", sprint_controller_1.getSprintsController); // get all items route
router.get("/sprints/:id", sprint_controller_1.getSprintController); // get single item route
router.patch("/sprints/:id", sprint_controller_1.updateSprintController); // update controller
router.post("/sprints", sprint_controller_1.createSprintController); // create  controller
exports.default = router;
