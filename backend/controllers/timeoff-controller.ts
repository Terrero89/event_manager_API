import { Request, Response } from "express";
import {  Timeoff } from "../models/timeoff-models";
import mongoose from "mongoose";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      id: string;
      // add other user properties if needed
    }
    interface Request {
      user?: User;
    }
  }
}

export const getTimeoffListController = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: No user ID found' });
    return;
  }

  try {
    const timeoffList = await Timeoff.find({ }).sort({ createdAt: -1 });
    res.json(timeoffList);
  } catch (err) {
    console.error("Error fetching standups:", err);
    res.status(500).json({ message: "Server error fetching standups" });
  }
};

export const getTimeoffController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Standup does not exist" });
    return;
  }

  const newEntry = await Timeoff.findById(id);
  if (!newEntry) {
    res.status(404).json({ error: "No Timeoff FOUND" });
    return;
  }

  res.status(200).json(newEntry);
};

export const createTimeoffController = async (req: any, res: Response) => {
  try {
    const newEntry = await Timeoff.create({
      ...req.body,
      user: req.user.id,
    });
    console.log("CREATING....",{...req.body})
    res.status(200).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating timeoff" });
  }
};

export const updateTimeoffController = async (req: Request, res: Response) => {
  const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such timeoff" });
    return;
  }

  const newEntry = await Timeoff.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!newEntry) {
    res.status(400).json({ error: "No such standup available" });
    return;
  }

  res.status(200).json(newEntry );
};

export const deleteTimeoffController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Standup does not exist" });
    return;
  }

  const newEntry= await Timeoff.findByIdAndDelete(id);
  if (!newEntry) {
    res.status(404).json({ error: "No standup found" });
    return;
  }

  res.status(200).json(newEntry);
};
