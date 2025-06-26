import mongoose from "mongoose";

// Define DevType as an enum

const storySchema = new mongoose.Schema(
  {
    sprintId: {      type: String,      required: false,    },
    storyNumber: {      type: String,      required: false,    },
    storyName: {      type: String,      required: false,    },
    storyDescription: {      type: String,      required: false,    },
    difficultyLevel: {      type: String,      required: false,    },
    storyPoints: {      type: Number,      required: false,    },
    workType: {      type: String,      required: false,    },
    developmentType: {      type: String, // FE | BE | FS      required: true,    },
    status: {      type: String,      required: false,    },
    reporter: {      type: String,      required: true,    },
    storyComments: {      type: String,      required: false,    },
    learning: {      type: String,      required: false,    },
    repoNames: {      type: String,      required: false,    },
    dateAssigned: {      type: Date,      default: Date.now,    },
    dateCompleted: {      type: Date,      default: Date.now,    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
},
  { timestamps: true }
);
export const Stories = mongoose.model("Stories", storySchema);
