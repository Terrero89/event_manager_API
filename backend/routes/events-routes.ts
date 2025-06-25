import { Router } from "express";
import {
    getEventsController,
    getEventController,
    deleteEventController,
    updateEventController,
    createEventController,
}

from "../controllers/events-controller";
import { verifyToken} from '../utils/auth-util'


const router = Router();

// event routes --> api/v1/
router.get("/", getEventsController);// get all todos route
router.get("/:id",  getEventController); // get all todo route
router.delete("/:id",verifyToken, deleteEventController);
router.patch("/:id",verifyToken, updateEventController); // update todo controller
router.post("/", verifyToken, createEventController); // delete todo controller

export default router;