
import mongoose, { Schema } from 'mongoose';
const StandupSchema: Schema = new Schema({
   sprintId: { type: String, required: false },
    workingOn: { type: String, required: true }, // spike, story etc..
    notes: { type: String, required: true },
    learnings: { type: String, required: true },
    repo: { type: String, required: true }, // repo links
    ticketNumber: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

},{ timestamps: true });


export const Standup = mongoose.model("Standups", StandupSchema);
