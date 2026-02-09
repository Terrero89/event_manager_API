
import { Request, Response } from "express";
import { DaysOff } from "../models/daysoff-model";


export const createDaysOffController = async (req: any, res: Response) => {
  try {
    const daysOff = await DaysOff.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).json(daysOff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating daysOff" });
  }
};

export const getDaysOffListController = async (req: Request, res: Response) => {
  try {
    const daysOffList = await DaysOff.find({}).sort({ createdAt: -1 });
    res.status(200).json(daysOffList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching daysOff list" });
  }
};
export const getDaysOffController = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: No daysOff found' });
    return;
  }

  try {
    const daysOff = await DaysOff.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(daysOff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching daysOff" });
  }
};

export const updateDaysOffController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedDaysOff = await DaysOff.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedDaysOff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating daysOff" });
  }
};

export const deleteDaysOffController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await DaysOff.findByIdAndDelete(id);
    res.status(200).json({ message: "DaysOff deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting daysOff" });
  }
};