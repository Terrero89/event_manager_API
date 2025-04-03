"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meetings_controller_1 = require("../controllers/meetings-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/meetings", meetings_controller_1.getMeetingsController); // get all todos route
router.get("/meetings/:id", meetings_controller_1.getMeetingController); // get all todo route
router.delete("/meetings/:id", meetings_controller_1.deleteMeetingController);
router.patch("/meetings/:id", meetings_controller_1.updateMeetingController); // update todo controller
router.post("/meetings", meetings_controller_1.createMeetingController); // delete todo controller
exports.default = router;
