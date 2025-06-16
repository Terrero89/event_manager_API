import mongoose, { Schema } from "mongoose";

const MeetingsSchema: Schema = new Schema(
  {
  
    meetingName: { type: String, required: true },
    meetingType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true },
    sprintId: { type: String, required: true}
  },
  { timestamps: true }
);

export const Meeting = mongoose.model("Meetings", MeetingsSchema);