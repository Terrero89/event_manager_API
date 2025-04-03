"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define DevType as an enum
const storySchema = new mongoose_1.default.Schema({
    storyTitle: { type: String, required: true },
    storyDescription: { type: String, required: true },
    acceptanceCriteria: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    developmentType: { type: String, required: true },
    status: { type: String, required: true },
    storyComments: { type: String, required: true },
    reporter: { type: String, required: true },
    repoNames: { type: [String], required: true },
    dateAssigned: { type: Date, required: true },
    daysDuration: { type: Number, required: true },
    sprint: { type: Number, required: true },
    storyType: { type: String, required: true },
    learning: { type: String, default: false },
}, { timestamps: true });
exports.Stories = mongoose_1.default.model("Stories", storySchema);
