import mongoose, { Schema } from 'mongoose';


const NotesSchema: Schema = new Schema({
    title: { type: String, required: true},
    noteName: { type: String, required: true },
    noteType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    priorityLevel: { type: String, required: true },


},{ timestamps: true });


export const Note = mongoose.model("Notes", NotesSchema);