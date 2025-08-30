import mongoose, { Schema } from 'mongoose';


const NotesSchema: Schema = new Schema({

    noteName: { type: String, required: true },
    noteType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    sprintId: { type: String, required: false },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


},{ timestamps: true });


export const Note = mongoose.model("Notes", NotesSchema);