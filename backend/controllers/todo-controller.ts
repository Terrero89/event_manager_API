import { Request, Response } from "express";
import { Todo } from "../models/todo-models";
import mongoose from "mongoose";



export const getTodosController = async (req: Request, res: Response) => {
    try {
        const allTodos = await Todo.find({}).sort({ createdAt: -1 });
        res.status(200).json(allTodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Todos" });
    }
}

export const getTodoController = async (req: Request, res: Response) => {
    const { id } = req.params; //grabbing id params from the request object

    //?handling error if no id is found
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }

    const todo = await Todo.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!todo) {
        res.status(404).json({ error: "NO TODO FOUND" });
        return;
    }

    res.status(200).json(todo); //return that specific id from tODO
}

export const createTodoController = async (req: Request, res: Response) => {
    const { title, description, date, dueDate, priorityLevel, status, relatedStoryId } = req.body
    // MORE ERROR HANDLING COMING UP


    try {
        const todo = await Todo.create({
            title,
            description,
            date,
            dueDate,
            priorityLevel,
            status,
            relatedStoryId
        });


        res.status(200).json(todo);
    } catch (error) {
        console.error(error)
    }
}
export const updateTodoController = async (req: Request, res: Response) => {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such todo" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const todo = await Todo.findOneAndUpdate(
        { _id: id },
        {

            ...req.body,

        }
    );
    //if no todo, throw error
    if (!todo) {
        res.status(400).json({ error: "No such story available" });
        return;
    }

    res.status(200).json(todo);
}
export const deleteTodoController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
        res.status(404).json({ error: "No todo found" });
        return;
    }

    res.status(200).json(todo);
}
