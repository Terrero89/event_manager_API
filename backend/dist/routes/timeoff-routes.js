"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timeoff_controller_1 = require("../controllers/timeoff-controller");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", auth_util_1.verifyToken, timeoff_controller_1.getTimeoffListController); // ✅ Secure all
router.get("/:id", auth_util_1.verifyToken, timeoff_controller_1.getTimeoffController); // ✅
router.delete("/:id", auth_util_1.verifyToken, timeoff_controller_1.deleteTimeoffController); // ✅
router.patch("/:id", auth_util_1.verifyToken, timeoff_controller_1.updateTimeoffController); // ✅
router.post("/", auth_util_1.verifyToken, timeoff_controller_1.createTimeoffController);
exports.default = router;
