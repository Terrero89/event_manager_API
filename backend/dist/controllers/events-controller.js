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
exports.deleteEventController = exports.updateEventController = exports.createEventController = exports.getEventController = exports.getEventsController = void 0;
const events_models_1 = require("../models/events-models");
const mongoose_1 = __importDefault(require("mongoose"));
const getEventsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: No user ID found' });
        return;
    }
    try {
        const events = yield events_models_1.Event.find({ user: userId }).sort({ createdAt: -1 });
        ;
        res.json(events); // ✅ just send response
    }
    catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ message: "Server error fetching events" });
    }
});
exports.getEventsController = getEventsController;
const getEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //grabbing id params from the request object
    //?handling error if no id is found
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }
    const event = yield events_models_1.Event.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!event) {
        res.status(404).json({ error: "NO Event FOUND" });
        return;
    }
    res.status(200).json(event); //return that specific id from tODO
});
exports.getEventController = getEventController;
const createEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield events_models_1.Event.create(Object.assign(Object.assign({}, req.body), { user: req.user.id }));
        res.status(200).json(event);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createEventController = createEventController;
const updateEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such event" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const event = yield events_models_1.Event.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    //if no todo, throw error
    if (!event) {
        res.status(400).json({ error: "No such event available" });
        return;
    }
    res.status(200).json(event);
});
exports.updateEventController = updateEventController;
const deleteEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Event does not exist" });
        return;
    }
    const event = yield events_models_1.Event.findByIdAndDelete(id);
    if (!event) {
        res.status(404).json({ error: "No event found" });
        return;
    }
    res.status(200).json(event);
});
exports.deleteEventController = deleteEventController;
