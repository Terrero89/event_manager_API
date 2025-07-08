import mongoose, { Schema } from "mongoose";

const MeetingsSchema: Schema = new Schema(
  {
  
    meetingName: { type: String, required: true },
    meetingType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true },
    sprintId: { type: String, required: true},
    startTime: {type:String, required: true},
       endTime: {type:String, required: true}
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Meeting = mongoose.model("Meetings", MeetingsSchema);