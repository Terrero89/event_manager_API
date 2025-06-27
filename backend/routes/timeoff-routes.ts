
import { Router } from "express";
import {
    createTimeoffController,
    deleteTimeoffController,
    getTimeoffController,
    getTimeoffListController,
    updateTimeoffController,

} from "../controllers/timeoff-controller";


// import { verifyToken} from '../utils/auth-util'



const router = Router();

// event routes --> api/v1/
router.get("/",  getTimeoffListController);         // ✅ Secure all
router.get("/:id", getTimeoffController);       // ✅
router.delete("/:id", deleteTimeoffController); // ✅
router.patch("/:id", updateTimeoffController);  // ✅
router.post("/", createTimeoffController);
export default router;