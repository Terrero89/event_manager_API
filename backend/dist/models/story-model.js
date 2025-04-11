"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define DevType as an enum
const storySchema = new mongoose_1.default.Schema({
    sprintId: {
        type: String,
        required: true,
    },
    storyTitle: {
        type: String,
        required: true,
    },
    storyNumber: {
        type: String,
        required: true,
    },
    storyName: {
        type: String,
        required: true,
    },
    storyDescription: {
        type: Array,
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
    },
    storyPoints: {
        type: Number,
        required: true,
    },
    workType: {
        type: String,
        required: true,
    },
    developmentType: {
        type: String, // FE | BE | FS
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    reporter: {
        type: String,
        required: true,
    },
    storyComments: {
        type: String,
        required: false,
    },
    learning: {
        type: String,
        required: false,
    },
    repoNames: {
        type: String,
        required: true,
    },
    dateAssigned: {
        type: Date,
        default: Date.now,
    },
    dateCompleted: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
exports.Stories = mongoose_1.default.model("Stories", storySchema);
