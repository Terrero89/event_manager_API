"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = require("../controllers/note-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/todos", note_controller_1.getNotesController); // get all todos route
router.get("/todos/:id", note_controller_1.getNoteController); // get all todo route
router.delete("/todos/:id", note_controller_1.deleteNoteController);
router.patch("/todos/:id", note_controller_1.updateNoteController); // update todo controller
router.post("/todos", note_controller_1.createNoteController); // delete todo controller
exports.default = router;
