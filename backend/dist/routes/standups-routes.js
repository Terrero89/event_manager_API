"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const standups_controllers_1 = require("../controllers/standups-controllers");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", auth_util_1.verifyToken, standups_controllers_1.getStandupsController); // ✅ Secure all
router.get("/:id", auth_util_1.verifyToken, standups_controllers_1.getStandupController); // ✅
router.delete("/:id", auth_util_1.verifyToken, standups_controllers_1.deleteStandupController); // ✅
router.patch("/:id", auth_util_1.verifyToken, standups_controllers_1.updateStandupController); // ✅
router.post("/", auth_util_1.verifyToken, standups_controllers_1.createStandupController);
exports.default = router;
