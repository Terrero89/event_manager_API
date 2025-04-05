import { Router } from "express";
import {
    getEventsController,
    getEventController,
    deleteEventController,
    updateEventController,
    createEventController,
}

from "../controllers/events-controller";

const router = Router();

// event routes --> api/v1/
router.get("/events", getEventsController);// get all todos route
router.get("/events/:id",  getEventController); // get all todo route
router.delete("/events/:id", deleteEventController);
router.patch("/events/:id",updateEventController); // update todo controller
router.post("/events", createEventController); // delete todo controller

export default router;