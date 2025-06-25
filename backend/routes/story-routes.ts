import { Router } from "express";
import {
  getStoriesController,
  getStoryController,
  deleteStoryController,
  updateStoryController,
  createStoryController,
} from "../controllers/story-controller";
import { verifyToken } from "../utils/auth-util";

const router = Router();

// event routes --> api/v1/
router.get("/", getStoriesController); // get all events route
router.get("/:id", getStoryController); // get all events route
router.delete("/:id", verifyToken,deleteStoryController);
router.patch("/:id",verifyToken, updateStoryController); // update story controller
router.post("/",verifyToken, createStoryController); // delete story controller

export default router;
