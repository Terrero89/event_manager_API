import mongoose from "mongoose";

// Define DevType as an enum

const storySchema = new mongoose.Schema(
  {
    storyTitle: {
      type: String,
      required: true,
    },
    storyNumber: {
      type: String,
      required: true,
    },
    storyName: {
      type: String,
      required: true,
    },
    storyDescription: {
      type: Array,
      required: true,
    },
    acceptanceCriteria: {
      type: Array,
      required: true,
    },
    difficultyLevel: {
      type: String,
      required: true,
    },
    storyPoints: {
      type: Number,
      required: true,
    },
    workType: {
      type: String,
      required: true,
    },
    developmentType: {
      type: String, // FE | BE | FS
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
    storyComments: {
      type: Array,
      required: false,
    },
  
    date: {
      type: Date,
      default: Date.now,
    },
    sprintId: { type: String, required: true}
  },
  { timestamps: true }
);

export const Stories = mongoose.model("Stories", storySchema);
