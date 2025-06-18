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
exports.deleteSprintController = exports.updateSprintController = exports.getSprintController = exports.createSprintController = exports.getSprintsController = void 0;
const sprint_model_1 = require("../models/sprint-model");
const mongoose_1 = __importDefault(require("mongoose"));
const getSprintsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sprints = yield sprint_model_1.Sprint.find({}).sort({ createdAt: -1 });
        res.status(200).json(sprints);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching sprints" });
    }
});
exports.getSprintsController = getSprintsController;
const createSprintController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sprintId, startDate, endDate, summary, piNotes, storiesUnderSprint, } = req.body;
    try {
        const newSprint = yield sprint_model_1.Sprint.create({
            sprintId,
            startDate,
            endDate,
            summary,
            piNotes,
            storiesUnderSprint,
        });
        res.status(200).json(newSprint);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createSprintController = createSprintController;
const getSprintController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //grabbing id params from the request object
    //?handling error if no id is found
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Sprint does not exist" });
        return;
    }
    const sprint = yield sprint_model_1.Sprint.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!sprint) {
        res.status(404).json({ error: "NO Sprint found" });
        return;
    }
    res.status(200).json(sprint); //return that specific id from exam
});
exports.getSprintController = getSprintController;
const updateSprintController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such sprint item" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const sprint = yield sprint_model_1.Sprint.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    //if no exam, throw error
    if (!sprint) {
        res.status(400).json({ error: "No such sprint available" });
        return;
    }
    res.status(200).json(sprint);
});
exports.updateSprintController = updateSprintController;
const deleteSprintController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Sprint does not exist" });
        return;
    }
    const sprint = yield sprint_model_1.Sprint.findByIdAndDelete(id);
    if (!sprint) {
        res.status(404).json({ error: "No sprint found" });
        return;
    }
    res.status(200).json(sprint);
});
exports.deleteSprintController = deleteSprintController;
