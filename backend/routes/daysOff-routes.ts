import { Router } from "express";
import {
    getDaysOffController,
    getDaysOffListController,
    createDaysOffController,
    updateDaysOffController,
    deleteDaysOffController,
} from "../controllers/daysOff-controller";
import { verifyToken } from "../utils/auth-util";

const router = Router();

// event routes --> api/v1/
router.get("/", verifyToken, getDaysOffListController);         // ✅ Secure all
router.get("/:id", verifyToken, getDaysOffController);       // ✅
router.delete("/:id", verifyToken, deleteDaysOffController); // ✅
router.patch("/:id", verifyToken, updateDaysOffController);  // ✅
router.post("/", verifyToken, createDaysOffController); 

export default router;