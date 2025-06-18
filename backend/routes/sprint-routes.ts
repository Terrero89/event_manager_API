

import { Router } from "express";
import {
getSprintController, 
getSprintsController,
updateSprintController,
createSprintController,
deleteSprintController

} from "../controllers/sprint-controller";

const router = Router();

// event routes --> api/v1/
router.get("/", getSprintsController); // get all items route
router.get("/:id", getSprintController); // get single item route
router.delete("/:id", deleteSprintController);
router.patch("/:id", updateSprintController); // update controller
router.post("/", createSprintController); // create  controller

export default router;
