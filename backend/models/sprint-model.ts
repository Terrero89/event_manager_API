import mongoose, { Schema } from 'mongoose';


const SprintSchema: Schema = new Schema({
    sprintId: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    summary: { type: Array , required: false },
    piNotes: { type: Array, required: false },
    storiesUnderSprint:{
        type: Array,
        required: false,
    }

});


export const Sprint = mongoose.model("Sprint", SprintSchema);


