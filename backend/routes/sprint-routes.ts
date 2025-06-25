

import { Router } from "express";
import {
getSprintController, 
getSprintsController,
updateSprintController,
createSprintController,
deleteSprintController

} from "../controllers/sprint-controller";
import { verifyToken } from "../utils/auth-util";

const router = Router();

// event routes --> api/v1/
router.get("/", getSprintsController); // get all items route
router.get("/:id", getSprintController); // get single item route
router.delete("/:id",verifyToken, deleteSprintController);
router.patch("/:id",verifyToken, updateSprintController); // update controller
router.post("/",verifyToken, createSprintController); // create  controller

export default router;
