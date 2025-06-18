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
router.get("/", getStoriesController); // get all events route
router.get("/:id", getStoryController); // get all events route
router.delete("/:id", deleteStoryController);
router.patch("/:id", updateStoryController); // update story controller
router.post("/", createStoryController); // delete story controller

export default router;
