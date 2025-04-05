import { Request, Response } from "express";
import { Event } from "../models/events-models";
import mongoose from "mongoose";



export const getEventsController = async (req: Request, res: Response) => {
    try {
        const allEvents = await Event.find({}).sort({ createdAt: -1 });
        res.status(200).json(allEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Notes" });
    }
}

export const getEventController = async (req: Request, res: Response) => {
    const { id } = req.params; //grabbing id params from the request object

    //?handling error if no id is found
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }

    const event = await Event.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!event) {
        res.status(404).json({ error: "NO Event FOUND" });
        return;
    }

    res.status(200).json(event); //return that specific id from tODO
}

export const createEventController = async (req: Request, res: Response) => {
    const { title, description, date, eventName, eventType, duration, status, sprintId} = req.body
    // MORE ERROR HANDLING COMING UP

    try {
        const event = await Event.create({
            title,
            description,
            date,
            eventName,
            eventType,
            duration,
            status,
            sprintId,
        });


        res.status(200).json(event);
    } catch (error) {
        console.error(error)
    }
}
export const updateEventController = async (req: Request, res: Response) => {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such event" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const event = await Event.findOneAndUpdate(
        { _id: id },
        {

            ...req.body,

        }
    );
    //if no todo, throw error
    if (!event) {
        res.status(400).json({ error: "No such event available" });
        return;
    }

    res.status(200).json(event);
}
export const deleteEventController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
        res.status(404).json({ error: "No event found" });
        return;
    }

    res.status(200).json(event);
}