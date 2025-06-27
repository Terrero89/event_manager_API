import { Router } from "express";
import {
    getMeetingsController,
    getMeetingController,
    deleteMeetingController,
    updateMeetingController,
    createMeetingController,
}

from "../controllers/meetings-controller";
import { verifyToken} from '../utils/auth-util'
const router = Router();

// event routes --> api/v1/
router.get("/", verifyToken, getMeetingsController,);// get all todos route
router.get("/:id", verifyToken, getMeetingController); // get all todo route
router.delete("/:id",verifyToken,  deleteMeetingController);
router.patch("/:id",verifyToken,  updateMeetingController); // update todo controller
router.post("/", verifyToken, createMeetingController); // delete todo controller

export default router;