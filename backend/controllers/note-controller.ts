import { Request, Response } from "express";
import { Note} from "../models/notes-models";
import mongoose from "mongoose";



export const getNotesController = async (req: Request, res: Response) => {
    try {
        const allTodos = await Note.find({}).sort({ createdAt: -1 });
        res.status(200).json(allTodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Notes" });
    }
}

export const getNoteController = async (req: Request, res: Response) => {
    const { id } = req.params; //grabbing id params from the request object

    //?handling error if no id is found
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }

    const note = await Note.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!note) {
        res.status(404).json({ error: "NO Note FOUND" });
        return;
    }

    res.status(200).json(note); //return that specific id from tODO
}

export const createNoteController = async (req: Request, res: Response) => {
    const { description, date, dueDate, priorityLevel, noteName, noteType, sprintId} = req.body
    // MORE ERROR HANDLING COMING UP


    try {
        const note = await Note.create({
            
            description,
            date,
            priorityLevel,
            noteType,
            noteName,
            sprintId
        
        });


        res.status(200).json(note);
    } catch (error) {
        console.error(error)
    }
}
export const updateNoteController = async (req: Request, res: Response) => {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such todo" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const note = await Note.findOneAndUpdate(
        { _id: id },
        {

            ...req.body,

        }
    );
    //if no todo, throw error
    if (!note) {
        res.status(400).json({ error: "No such story available" });
        return;
    }

    res.status(200).json(note);
}
export const deleteNoteController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
        res.status(404).json({ error: "No todo found" });
        return;
    }

    res.status(200).json(note);
}