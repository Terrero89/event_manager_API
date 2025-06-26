import { Request, Response } from "express";
import { Event } from "../models/events-models";
import mongoose from "mongoose";

export const getEventsController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: No user ID found' });
    return;
  }

  try {
    const events = await Event.find({ user: userId }).sort({ createdAt: -1 });;
    res.json(events); // ✅ just send response
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error fetching events" });
  }
};

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
};

export const createEventController = async (req: any, res: Response) => {
  const {
    description,
    date,
    eventName,
    eventType,
    duration,
    status,
    sprintId,
  } = req.body;

  try {
    const event = await Event.create({
      description,
      date,
      eventName,
      eventType,
      duration,
      status,
      sprintId,
      user: req.user.id,
    });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
  }
};
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
};
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
};
