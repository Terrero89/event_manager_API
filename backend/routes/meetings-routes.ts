import { Router } from "express";
import {
    getMeetingsController,
    getMeetingController,
    deleteMeetingController,
    updateMeetingController,
    createMeetingController,
}

from "../controllers/meetings-controller";

const router = Router();

// event routes --> api/v1/
router.get("/", getMeetingsController,);// get all todos route
router.get("/:id",  getMeetingController); // get all todo route
router.delete("/:id", deleteMeetingController);
router.patch("/:id", updateMeetingController); // update todo controller
router.post("/", createMeetingController); // delete todo controller

export default router;