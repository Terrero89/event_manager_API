import mongoose, { Schema, model, models } from 'mongoose';

const TimeoffSchema = new Schema({
  sprintId: { type: String, required: false },
  title: { type: String, required: true },
  timeOff: { type: Number, required: true },
  timeOffType: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Timeoff = models.Timeoff || model('Timeoff', TimeoffSchema);
