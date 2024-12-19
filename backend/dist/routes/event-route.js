"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get('/', event_controller_1.getHomeController); // home route
router.get('/events', event_controller_1.getEventsController); // get all events route
exports.default = router;
