"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define DevType as an enum
const storySchema = new mongoose_1.default.Schema({
    sprintId: { type: String, required: false, },
    storyNumber: { type: String, required: false, },
    storyName: { type: String, required: false, },
    storyDescription: { type: String, required: false, },
    difficultyLevel: { type: String, required: false, },
    storyPoints: { type: Number, required: false, },
    workType: { type: String, required: false, },
    developmentType: { type: String, // FE | BE | FS      required: true,    },
        status: { type: String, required: false, },
        reporter: { type: String, required: true, },
        storyComments: { type: String, required: false, },
        learning: { type: String, required: false, },
        repoNames: { type: String, required: false, },
        dateAssigned: { type: Date, default: Date.now, },
        dateCompleted: { type: Date, default: Date.now, },
        user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
    },
}, { timestamps: true });
exports.Stories = mongoose_1.default.model("Stories", storySchema);
