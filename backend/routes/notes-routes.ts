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
router.get("/todos", getNotesController); // get all todos route
router.get("/todos/:id", getNoteController); // get all todo route
router.delete("/todos/:id", deleteNoteController);
router.patch("/todos/:id", updateNoteController); // update todo controller
router.post("/todos", createNoteController); // delete todo controller

export default router;
