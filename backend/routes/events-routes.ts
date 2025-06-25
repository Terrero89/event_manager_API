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
router.get("/", verifyToken, getEventsController);         // ✅ Secure all
router.get("/:id", verifyToken, getEventController);       // ✅
router.delete("/:id", verifyToken, deleteEventController); // ✅
router.patch("/:id", verifyToken, updateEventController);  // ✅
router.post("/", verifyToken, createEventController); 
export default router;