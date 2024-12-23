"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoryController = exports.updateStoryController = exports.deleteStoryController = exports.getStoryController = exports.getStoriesController = void 0;
const story_model_1 = require("../models/story-model");
const mongoose_1 = __importDefault(require("mongoose"));
const getStoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStories = yield story_model_1.Stories.find({}).sort({ createdAt: -1 });
        res.status(200).json(allStories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching stories" });
    }
});
exports.getStoriesController = getStoriesController;
const getStoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //grabbing id params from the request object
    //?handling error if no id is found
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Exam does not exist" });
        return;
    }
    const story = yield story_model_1.Stories.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!story) {
        res.status(404).json({ error: "NO EXAM FOUND" });
        return;
    }
    res.status(200).json(story); //return that specific id from exam
});
exports.getStoryController = getStoryController;
const deleteStoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Story does not exist" });
        return;
    }
    const story = yield story_model_1.Stories.findByIdAndDelete(id);
    if (!story) {
        res.status(404).json({ error: "No story found" });
        return;
    }
    res.status(200).json(story);
});
exports.deleteStoryController = deleteStoryController;
const updateStoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such exam" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const story = yield story_model_1.Stories.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    //if no exam, throw error
    if (!story) {
        res.status(400).json({ error: "No such story available" });
        return;
    }
    res.status(200).json(story);
});
exports.updateStoryController = updateStoryController;
const createStoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { storyTitle, storyDescription, acceptanceCriteria, difficultyLevel, storyPoints, workType, developmentType, status, storyComments, subtasks, date, reporter, repoNames, dateAssigned, dateCompleted, sprint, storyType, learning, planningNotes, } = req.body;
    try {
        const story = yield story_model_1.Stories.create({
            storyTitle,
            storyDescription,
            acceptanceCriteria,
            difficultyLevel,
            storyPoints,
            workType,
            developmentType,
            status,
            storyComments,
            subtasks,
            date,
            reporter,
            repoNames,
            dateAssigned,
            dateCompleted,
            sprint,
            storyType,
            learning,
            planningNotes,
        });
        res.status(200).json(story);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createStoryController = createStoryController;
