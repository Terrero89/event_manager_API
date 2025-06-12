"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = require("../controllers/note-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/", note_controller_1.getNotesController); // get all todos route
router.get("/:id", note_controller_1.getNoteController); // get all todo route
router.delete("/:id", note_controller_1.deleteNoteController);
router.patch("/:id", note_controller_1.updateNoteController); // update todo controller
router.post("/", note_controller_1.createNoteController); // delete todo controller
exports.default = router;
