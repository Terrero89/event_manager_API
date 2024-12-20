import { Request, Response } from "express";
import { Stories } from "../models/story-model";
import mongoose from "mongoose";

export const getStoriesController = async (req: Request, res: Response) => {
  try {
    const allStories = await Stories.find({}).sort({ createdAt: -1 });
    res.status(200).json(allStories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stories" });
  }
};
export const getStoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; //grabbing id params from the request object

  //?handling error if no id is found
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Exam does not exist" });
    return;
  }

  const story = await Stories.findById(id); //finding by specific id from params
  //error handling for not id found
  if (!story) {
    res.status(404).json({ error: "NO EXAM FOUND" });
    return;
  }

  res.status(200).json(story); //return that specific id from exam
};

export const deleteStoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Story does not exist" });
    return;
  }

  const story = await Stories.findById(id);

  if (!story) {
    res.status(404).json({ error: "No story found" });
    return;
  }

  res.status(200).json(story);
};
export const updateStoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  //check if exist in mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such exam" });
    return;
  }
  //__id == mongoDB Id/ update id === __id
  const story = await Stories.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  //if no exam, throw error
  if (!story) {
    res.status(400).json({ error: "No such story available" });
    return;
  }

  res.status(200).json(story);
};

export const createStoryController = async (req: Request, res: Response) => {
  const {
    storyTitle,
    storyDescription,
    acceptanceCriteria,
    difficultyLevel,
    storyPoints,
    workType,
    developmentType,
    status,
    storyComments,
    subtasks,
    date,
    reporter,
    repoNames,
    dateAssigned,
    dateCompleted,
    sprint,
    storyType,
    learning,
    planningNotes,
  } = req.body;
  try {
    const story = await Stories.create({
      storyTitle,
      storyDescription,
      acceptanceCriteria,
      difficultyLevel,
      storyPoints,
      workType,
      developmentType,
      status,
      storyComments,
      subtasks,
      date,
      reporter,
      repoNames,
      dateAssigned,
      dateCompleted,
      sprint,
      storyType,
      learning,
      planningNotes,
    });
    res.status(200).json(story);
  } catch (error) {
    console.log(error);
  }
};
