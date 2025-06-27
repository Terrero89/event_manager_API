import { Request, Response } from "express";
import {  Standup } from "../models/standups-models";
import mongoose from "mongoose";

export const getStandupsController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: No user ID found' });
    return;
  }

  try {
    const standupList = await Standup.find({ }).sort({ createdAt: -1 });
    res.json(standupList);
  } catch (err) {
    console.error("Error fetching standups:", err);
    res.status(500).json({ message: "Server error fetching standups" });
  }
};

export const getStandupController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Standup does not exist" });
    return;
  }

  const standup = await Standup.findById(id);
  if (!standup) {
    res.status(404).json({ error: "No Standup FOUND" });
    return;
  }

  res.status(200).json(standup);
};

export const createStandupController = async (req: any, res: Response) => {
  try {
    const standup = await Standup.create({
      ...req.body,
      user: req.user.id,
    });
    console.log("CREATING....",{...req.body})
    res.status(200).json(standup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating standup" });
  }
};

export const updateStandupController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such standup" });
    return;
  }

  const standup = await Standup.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!standup) {
    res.status(400).json({ error: "No such standup available" });
    return;
  }

  res.status(200).json(standup);
};

export const deleteStandupController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Standup does not exist" });
    return;
  }

  const standup = await Standup.findByIdAndDelete(id);
  if (!standup) {
    res.status(404).json({ error: "No standup found" });
    return;
  }

  res.status(200).json(standup);
};
