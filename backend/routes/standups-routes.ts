import { Router } from "express";
import {
    getStandupsController,
getStandupController,
createStandupController,
updateStandupController,
deleteStandupController,

} from "../controllers/standups-controllers";


import { verifyToken} from '../utils/auth-util'



const router = Router();

// event routes --> api/v1/
router.get("/",  getStandupsController);         // ✅ Secure all
router.get("/:id", getStandupController);       // ✅
router.delete("/:id", deleteStandupController); // ✅
router.patch("/:id", updateStandupController);  // ✅
router.post("/", createStandupController);
export default router;