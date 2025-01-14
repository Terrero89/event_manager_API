import mongoose, { Schema } from 'mongoose';


const SprintSchema: Schema = new Schema({
    sprintID: { type: String, required: false },
    relatedStoryId: { type: String, required: false },
    startDate: { type: Date, required: false },
    dueDate: { type: Date, required: false },
    summary: { type: Array , required: false },
    piNotes: { type: Array, required: false },
    storiesUnderSprint:{
        type: Array,
        required: false,
    }

});


export const Sprint = mongoose.model("Sprint", SprintSchema);


