import { Router } from "express";
import {
  getStoriesController,
  getStoryController,
  deleteStoryController,
  updateStoryController,
  createStoryController,
} from "../controllers/story-controller";

const router = Router();

// event routes --> api/v1/
router.get("/stories", getStoriesController); // get all events route
router.get("/stories/:id", getStoryController); // get all events route
router.delete("/stories/:id", deleteStoryController);
router.patch("/stories/:id", updateStoryController); // update story controller
router.post("/stories", createStoryController); // delete story controller

export default router;
