import { Router } from "express";
import {
    getNotesController,
    getNoteController,
    deleteNoteController,
    updateNoteController,
    createNoteController,
}

from "../controllers/note-controller";

const router = Router();

// event routes --> api/v1/
router.get("/", getNotesController); // get all todos route
router.get("/:id", getNoteController); // get all todo route
router.delete("/:id", deleteNoteController);
router.patch("/:id", updateNoteController); // update todo controller
router.post("/", createNoteController); // delete todo controller

export default router;