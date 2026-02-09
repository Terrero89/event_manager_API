"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const daysOff_controller_1 = require("../controllers/daysOff-controller");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", auth_util_1.verifyToken, daysOff_controller_1.getDaysOffListController); // ✅ Secure all
router.get("/:id", auth_util_1.verifyToken, daysOff_controller_1.getDaysOffController); // ✅
router.delete("/:id", auth_util_1.verifyToken, daysOff_controller_1.deleteDaysOffController); // ✅
router.patch("/:id", auth_util_1.verifyToken, daysOff_controller_1.updateDaysOffController); // ✅
router.post("/", auth_util_1.verifyToken, daysOff_controller_1.createDaysOffController);
exports.default = router;
