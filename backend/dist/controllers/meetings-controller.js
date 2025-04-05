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
exports.deleteMeetingController = exports.updateMeetingController = exports.createMeetingController = exports.getMeetingController = exports.getMeetingsController = void 0;
const meetings_models_1 = require("../models/meetings-models");
const mongoose_1 = __importDefault(require("mongoose"));
const getMeetingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMeetings = yield meetings_models_1.Meeting.find({}).sort({ createdAt: -1 });
        res.status(200).json(allMeetings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Notes" });
    }
});
exports.getMeetingsController = getMeetingsController;
const getMeetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //grabbing id params from the request object
    //?handling error if no id is found
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }
    const meeting = yield meetings_models_1.Meeting.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!meeting) {
        res.status(404).json({ error: "NO Event FOUND" });
        return;
    }
    res.status(200).json(meeting); //return that specific id from tODO
});
exports.getMeetingController = getMeetingController;
const createMeetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, meetingName, meetingType, duration, status, sprintId } = req.body;
    // MORE ERROR HANDLING COMING UP
    try {
        const meeting = yield meetings_models_1.Meeting.create({
            title,
            description,
            date,
            meetingName,
            meetingType,
            duration,
            status,
            sprintId
        });
        res.status(200).json(meeting);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createMeetingController = createMeetingController;
const updateMeetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such event" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const meeting = yield meetings_models_1.Meeting.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    //if no todo, throw error
    if (!meeting) {
        res.status(400).json({ error: "No such event available" });
        return;
    }
    res.status(200).json(meeting);
});
exports.updateMeetingController = updateMeetingController;
const deleteMeetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }
    const meeting = yield meetings_models_1.Meeting.findByIdAndDelete(id);
    if (!meeting) {
        res.status(404).json({ error: "No event found" });
        return;
    }
    res.status(200).json(meeting);
});
exports.deleteMeetingController = deleteMeetingController;
