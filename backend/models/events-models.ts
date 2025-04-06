import mongoose, { Schema } from 'mongoose';


const EventsSchema: Schema = new Schema({
    title: { type: String, required: true},
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true },
    sprintId: { type: String, required: true },

},{ timestamps: true });


export const Event = mongoose.model("Events", EventsSchema);
