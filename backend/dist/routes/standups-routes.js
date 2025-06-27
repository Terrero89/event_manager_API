"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const standups_controllers_1 = require("../controllers/standups-controllers");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", standups_controllers_1.getStandupsController); // ✅ Secure all
router.get("/:id", standups_controllers_1.getStandupController); // ✅
router.delete("/:id", standups_controllers_1.deleteStandupController); // ✅
router.patch("/:id", standups_controllers_1.updateStandupController); // ✅
router.post("/", standups_controllers_1.createStandupController);
exports.default = router;
