"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events-controller");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", events_controller_1.getEventsController); // get all todos route
router.get("/:id", events_controller_1.getEventController); // get all todo route
router.delete("/:id", auth_util_1.verifyToken, events_controller_1.deleteEventController);
router.patch("/:id", auth_util_1.verifyToken, events_controller_1.updateEventController); // update todo controller
router.post("/", auth_util_1.verifyToken, events_controller_1.createEventController); // delete todo controller
exports.default = router;
