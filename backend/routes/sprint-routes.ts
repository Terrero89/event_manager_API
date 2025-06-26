

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
router.get("/", verifyToken, getSprintsController); 
router.get("/:id", verifyToken, getSprintController);
router.delete("/:id",verifyToken, deleteSprintController);
router.patch("/:id",verifyToken, updateSprintController);
router.post("/",verifyToken, createSprintController); 

export default router;
