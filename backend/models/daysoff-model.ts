import mongoose, { Schema } from 'mongoose';


const DaysOffSchema: Schema = new Schema({
    currentYear: { type: Number, required: true },
    previousYearHours: { type: Number, required: true }, // hours from prev year
    currentPersonalDaysHours: {type: Number, required: false}, // total of personal days per year given
    currentSickDaysHours: {type: Number, required: false}, // total of sick days per year given
    currentVacationDaysHours: {type: Number, required: false}, // total of vacation days per year given
    currentHolidayDaysHours: {type: Number, required: false}, // total of holiday days per year given
    currentAccrueHoursForYear: {type: Number, required: false}, // total of accrued days per year given from jan to oct 1.5 days per month
    currentAccruedHoursForMonth: {type: Number, required: false}, // total of accrued days per month given from jan to oct 1.5 days per month
    currentAccruedMonthsPerYear: {type: Number, required: false}, // total of accrued days per year given from jan to oct 1.5 days per month
    status: { type: String, required: true },
    description: { type: String, required: true }, // short description for the hours or times
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

},{ timestamps: true });


export const DaysOff = mongoose.model("DaysOff", DaysOffSchema);
