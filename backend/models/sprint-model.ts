import mongoose, { Schema } from 'mongoose';


const SprintSchema: Schema = new Schema({
    sprintID: { type: String, required: true },
    relatedStoryId: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: false },
    summary: { type: Array , required: false },
    piNotes: { type: Array, required: false },
    storiesUnderSprint:{
        type: Array,
        required: false,
    }

});


export const Sprint = mongoose.model("Sprint", SprintSchema);


