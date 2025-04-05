"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/events", events_controller_1.getEventsController); // get all todos route
router.get("/events/:id", events_controller_1.getEventController); // get all todo route
router.delete("/events/:id", events_controller_1.deleteEventController);
router.patch("/events/:id", events_controller_1.updateEventController); // update todo controller
router.post("/events", events_controller_1.createEventController); // delete todo controller
exports.default = router;
