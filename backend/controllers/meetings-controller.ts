import { Request, Response } from "express";
import { Meeting } from "../models/meetings-models";
import mongoose from "mongoose";



export const getMeetingsController = async (req: Request, res: Response) => {
    try {
        const allMeetings = await Meeting.find({}).sort({ createdAt: -1 });
        res.status(200).json(allMeetings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Notes" });
    }
}

export const getMeetingController = async (req: Request, res: Response) => {
    const { id } = req.params; //grabbing id params from the request object

    //?handling error if no id is found
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }

    const meeting = await Meeting.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!meeting) {
        res.status(404).json({ error: "NO Event FOUND" });
        return;
    }

    res.status(200).json(meeting); //return that specific id from tODO
}

export const createMeetingController = async (req: any, res: Response) => {
    const {  description, date, meetingName, meetingType, duration, status, sprintId} = req.body
    
    // MORE ERROR HANDLING COMING UP


    try {
        const meeting = await Meeting.create({
       
            description,
            date,
            meetingName,
            meetingType,
            duration,
            status,
            sprintId,
            user: req.user.id // Assuming you have user info in req.user
        
        });


        res.status(200).json(meeting);
    } catch (error) {
        console.error(error)
    }
}
export const updateMeetingController = async (req: Request, res: Response) => {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such event" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const meeting = await Meeting.findOneAndUpdate(
        { _id: id },
        {

            ...req.body,

        }
    );
    //if no todo, throw error
    if (!meeting) {
        res.status(400).json({ error: "No such event available" });
        return;
    }

    res.status(200).json(meeting);
}
export const deleteMeetingController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }

    const meeting = await Meeting.findByIdAndDelete(id);

    if (!meeting) {
        res.status(404).json({ error: "No event found" });
        return;
    }

    res.status(200).json(meeting);
}