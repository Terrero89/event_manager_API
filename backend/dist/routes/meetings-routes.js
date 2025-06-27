"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meetings_controller_1 = require("../controllers/meetings-controller");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", auth_util_1.verifyToken, meetings_controller_1.getMeetingsController); // get all todos route
router.get("/:id", auth_util_1.verifyToken, meetings_controller_1.getMeetingController); // get all todo route
router.delete("/:id", auth_util_1.verifyToken, meetings_controller_1.deleteMeetingController);
router.patch("/:id", auth_util_1.verifyToken, meetings_controller_1.updateMeetingController); // update todo controller
router.post("/", auth_util_1.verifyToken, meetings_controller_1.createMeetingController); // delete todo controller
exports.default = router;
