import { Request, Response } from "express";
import { Sprint } from "../models/sprint-model";
import mongoose from "mongoose";

export const getSprintsController = async (req: Request, res: Response) => {
  try {
    const sprints = await Sprint.find({}).sort({ createdAt: -1 });
    res.status(200).json(sprints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sprints" });
  }
};

export const createSprintController = async (req: Request, res: Response) => {
  const {
    sprintId,
    startDate,
    endDate,
    summary,
    piNotes,
    storiesUnderSprint,

  } = req.body;
  try {
    const newSprint = await Sprint.create({
        sprintId,
        startDate,
        endDate,
        summary,
        piNotes,
        storiesUnderSprint,

    });
    res.status(200).json(newSprint);
  } catch (error) {
    console.log(error);
  }
};

export const getSprintController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; //grabbing id params from the request object

  //?handling error if no id is found
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Sprint does not exist" });
    return;
  }

  const sprint = await Sprint.findById(id); //finding by specific id from params
  //error handling for not id found
  if (!sprint) {
    res.status(404).json({ error: "NO Sprint found" });
    return;
  }

  res.status(200).json(sprint); //return that specific id from exam
};


export const updateSprintController = async (req: Request, res: Response) => {
  const { id } = req.params;
  //check if exist in mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such sprint item" });
    return;
  }
  //__id == mongoDB Id/ update id === __id
  const sprint = await Sprint.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  //if no exam, throw error
  if (!sprint) {
    res.status(400).json({ error: "No such sprint available" });
    return;
  }

  res.status(200).json(sprint);
};

export const deleteSprintController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Sprint does not exist" });
        return;
    }

    const sprint = await Sprint.findByIdAndDelete(id);

    if (!sprint) {
        res.status(404).json({ error: "No sprint found" });
        return;
    }

    res.status(200).json(sprint);
}
