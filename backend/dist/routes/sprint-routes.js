"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sprint_controller_1 = require("../controllers/sprint-controller");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", sprint_controller_1.getSprintsController); // get all items route
router.get("/:id", sprint_controller_1.getSprintController); // get single item route
router.delete("/:id", auth_util_1.verifyToken, sprint_controller_1.deleteSprintController);
router.patch("/:id", auth_util_1.verifyToken, sprint_controller_1.updateSprintController); // update controller
router.post("/", auth_util_1.verifyToken, sprint_controller_1.createSprintController); // create  controller
exports.default = router;
