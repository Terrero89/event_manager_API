import mongoose, { Schema } from 'mongoose';


const TodoSchema: Schema = new Schema({
    relatedStoryId: { type: String, required: true },
    title: { type: String, required: true},
    description: { type: String, required: true },
    date: { type: Date, required: true },
    dueDate: { type: Date, required: false },
    priorityLevel: { type: String, required: true },
    status: { type: String, required: true }

});


export const Todo = mongoose.model("Todos", TodoSchema);
