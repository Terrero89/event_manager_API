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
router.get("/notes", getNotesController); // get all todos route
router.get("/notes/:id", getNoteController); // get all todo route
router.delete("/notes/:id", deleteNoteController);
router.patch("/notes/:id", updateNoteController); // update todo controller
router.post("/notes", createNoteController); // delete todo controller

export default router;