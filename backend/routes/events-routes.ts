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
router.get("/", getEventsController);// get all todos route
router.get("/:id",  getEventController); // get all todo route
router.delete("/:id", deleteEventController);
router.patch("/:id",updateEventController); // update todo controller
router.post("/", createEventController); // delete todo controller

export default router;