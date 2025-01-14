

import { Router } from "express";
import {
getSprintController, 
getSprintsController,
updateSprintController,
createSprintController

} from "../controllers/sprint-controller";

const router = Router();

// event routes --> api/v1/
router.get("/sprints", getSprintsController); // get all items route
router.get("/sprints/:id", getSprintController); // get single item route
router.patch("/sprints/:id", updateSprintController); // update controller
router.post("/sprints", createSprintController); // create  controller

export default router;
