"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sprint_controller_1 = require("../controllers/sprint-controller");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", auth_util_1.verifyToken, sprint_controller_1.getSprintsController);
router.get("/:id", auth_util_1.verifyToken, sprint_controller_1.getSprintController);
router.delete("/:id", auth_util_1.verifyToken, sprint_controller_1.deleteSprintController);
router.patch("/:id", auth_util_1.verifyToken, sprint_controller_1.updateSprintController);
router.post("/", auth_util_1.verifyToken, sprint_controller_1.createSprintController);
exports.default = router;
