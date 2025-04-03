import mongoose from "mongoose";

// Define DevType as an enum

const storySchema = new mongoose.Schema(
  {
    storyTitle: { type: String, required: true },
    storyDescription: { type: String, required: true },
    acceptanceCriteria: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    developmentType: { type: String, required: true },
    status: { type: String, required: true },
    storyComments: { type: String, required: true },
    reporter: { type: String, required: true },
    repoNames: { type: [String], required: true },
    dateAssigned: { type: Date, required: true },
    daysDuration: { type: Number, required: true },
    sprint: { type: Number, required: true },
    storyType: { type: String, required: true },
    learning: { type: String, default: false },
  },
  { timestamps: true }
);

export const Stories = mongoose.model("Stories", storySchema);
