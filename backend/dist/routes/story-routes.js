"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const story_controller_1 = require("../controllers/story-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", story_controller_1.getStoriesController); // get all events route
router.get("/:id", story_controller_1.getStoryController); // get all events route
router.delete("/:id", story_controller_1.deleteStoryController);
router.patch("/:id", story_controller_1.updateStoryController); // update story controller
router.post("/", story_controller_1.createStoryController); // delete story controller
exports.default = router;
