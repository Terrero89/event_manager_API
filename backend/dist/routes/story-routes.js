"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const story_controller_1 = require("../controllers/story-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/stories", story_controller_1.getStoriesController); // get all events route
router.get("/stories/:id", story_controller_1.getStoryController); // get all events route
router.delete("/stories/:id", story_controller_1.deleteStoryController);
router.patch("/stories/:id", story_controller_1.updateStoryController); // update story controller
router.post("/stories", story_controller_1.createStoryController); // delete story controller
exports.default = router;
