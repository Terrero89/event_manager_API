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
router.get("/",verifyToken,    getStandupsController);         // ✅ Secure all
router.get("/:id",verifyToken, getStandupController);       // ✅
router.delete("/:id",verifyToken, deleteStandupController); // ✅
router.patch("/:id",verifyToken, updateStandupController);  // ✅
router.post("/",verifyToken, createStandupController);
export default router;