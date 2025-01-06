"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define DevType as an enum
const storySchema = new mongoose_1.default.Schema({
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
    acceptanceCriteria: {
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
    storyComments: {
        type: Array,
        required: false,
    },
    subtasks: {
        type: Array,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
exports.Stories = mongoose_1.default.model("Stories", storySchema);
