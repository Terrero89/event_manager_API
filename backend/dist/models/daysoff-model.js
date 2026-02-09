"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaysOff = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DaysOffSchema = new mongoose_1.Schema({
    previousYearHours: { type: Number, required: true }, // hours from prev year
    currentPersonalDaysHours: { type: Number, required: false }, // total of personal days per year given
    currentSickDaysHours: { type: Number, required: false }, // total of sick days per year given
    currentVacationDaysHours: { type: Number, required: false }, // total of vacation days per year given
    currentHolidayDaysHours: { type: Number, required: false }, // total of holiday days per year given
    currentAccrueHoursForYear: { type: Number, required: false }, // total of accrued days per year given from jan to oct 1.5 days per month
    currentAccruedHoursForMonth: { type: Number, required: false }, // total of accrued days per month given from jan to oct 1.5 days per month
    currentAccruedMonthsPerYear: { type: Number, required: false }, // total of accrued days per year given from jan to oct 1.5 days per month
    status: { type: String, required: true },
    description: { type: String, required: true }, // short description for the hours or times
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
exports.DaysOff = mongoose_1.default.model("DaysOff", DaysOffSchema);
