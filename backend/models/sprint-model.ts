import mongoose, { Schema } from 'mongoose';


const SprintSchema: Schema = new Schema({
    sprintId: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    summary: { type: String , required: false },
    piNotes: { type: String, required: false },
    storiesUnderSprint:{
        type: String,
        required: false,
    },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });



export const Sprint = mongoose.model("Sprint", SprintSchema);


