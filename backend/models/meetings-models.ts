import mongoose, { Schema } from "mongoose";

const MeetingsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    meetingName: { type: String, required: true },
    meetingType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const Meeting = mongoose.model("Meetings", MeetingsSchema);