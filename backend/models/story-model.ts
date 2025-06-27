import mongoose from "mongoose";

// Define DevType as an enum

const storySchema = new mongoose.Schema(
  {
sprintId: { type: String, required: true },
storyNumber: { type: String, required: true },
storyName: { type: String, required: true },
storyDescription: { type: String, required: true },
difficultyLevel: { type: String, required: true },
storyPoints: { type: Number, required: true },
workType: { type: String, required: true },
developmentType: { type: String, required: true }, // FE | BE | FS
status: { type: String, required: true },
reporter: { type: String, required: true },
storyComments: { type: String, required: true },
learning: { type: String, required: true },
repoNames: { type: String, required: true },
dateAssigned: { type: Date, default: Date.now },
dateCompleted: { type: Date, default: Date.now },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

},
  { timestamps: true }
);
export const Stories = mongoose.model("Stories", storySchema);
