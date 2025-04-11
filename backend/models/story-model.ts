import mongoose from "mongoose";

// Define DevType as an enum

const storySchema = new mongoose.Schema(
  {
    sprintId: {
      type: String,
      required: true,
    },
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
   reporter: {
      type: String, 
      required: true,
    },
   
    storyComments: {
      type: String,
      required: false,
    },
learning: {
      type: String,
      required: false,
    },
    repoNames: {
      type: String, 
      required: true,
    },
    dateAssigned: {
      type: Date,
      default: Date.now,
    },
    dateCompleted: {
      type: Date,
      default: Date.now,
    },
  }, 
  { timestamps: true }
);

export const Stories = mongoose.model("Stories", storySchema);
