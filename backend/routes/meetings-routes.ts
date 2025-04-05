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
router.get("/meetings", getMeetingsController,);// get all todos route
router.get("/meetings/:id",  getMeetingController); // get all todo route
router.delete("/meetings/:id", deleteMeetingController);
router.patch("/meetings/:id", updateMeetingController); // update todo controller
router.post("/meetings", createMeetingController); // delete todo controller

export default router;