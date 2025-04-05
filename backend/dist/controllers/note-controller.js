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
exports.deleteNoteController = exports.updateNoteController = exports.createNoteController = exports.getNoteController = exports.getNotesController = void 0;
const notes_models_1 = require("../models/notes-models");
const mongoose_1 = __importDefault(require("mongoose"));
const getNotesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield notes_models_1.Note.find({}).sort({ createdAt: -1 });
        res.status(200).json(allTodos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Notes" });
    }
});
exports.getNotesController = getNotesController;
const getNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //grabbing id params from the request object
    //?handling error if no id is found
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }
    const note = yield notes_models_1.Note.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!note) {
        res.status(404).json({ error: "NO Note FOUND" });
        return;
    }
    res.status(200).json(note); //return that specific id from tODO
});
exports.getNoteController = getNoteController;
const createNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, dueDate, priorityLevel, noteName, noteType, sprintId } = req.body;
    // MORE ERROR HANDLING COMING UP
    try {
        const note = yield notes_models_1.Note.create({
            title,
            description,
            date,
            priorityLevel,
            noteType,
            noteName,
            sprintId
        });
        res.status(200).json(note);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createNoteController = createNoteController;
const updateNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such todo" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const note = yield notes_models_1.Note.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    //if no todo, throw error
    if (!note) {
        res.status(400).json({ error: "No such story available" });
        return;
    }
    res.status(200).json(note);
});
exports.updateNoteController = updateNoteController;
const deleteNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }
    const note = yield notes_models_1.Note.findByIdAndDelete(id);
    if (!note) {
        res.status(404).json({ error: "No todo found" });
        return;
    }
    res.status(200).json(note);
});
exports.deleteNoteController = deleteNoteController;
