import { Router } from "express";
import {
    getNotesController,
    getNoteController,
    deleteNoteController,
    updateNoteController,
    createNoteController,
}

from "../controllers/note-controller";
import { verifyToken } from "../utils/auth-util";

const router = Router();

// event routes --> api/v1/
router.get("/", verifyToken, getNotesController); // get all todos route
router.get("/:id",verifyToken, getNoteController); // get all todo route
router.delete("/:id",verifyToken, deleteNoteController);
router.patch("/:id", verifyToken, updateNoteController); // update todo controller
router.post("/",verifyToken, createNoteController); // delete todo controller

export default router;