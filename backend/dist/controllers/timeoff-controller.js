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
exports.deleteTimeoffController = exports.updateTimeoffController = exports.createTimeoffController = exports.getTimeoffController = exports.getTimeoffListController = void 0;
const timeoff_models_1 = require("../models/timeoff-models");
const mongoose_1 = __importDefault(require("mongoose"));
const getTimeoffListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: No user ID found' });
        return;
    }
    try {
        const timeoffList = yield timeoff_models_1.Timeoff.find({}).sort({ createdAt: -1 });
        res.json(timeoffList);
    }
    catch (err) {
        console.error("Error fetching standups:", err);
        res.status(500).json({ message: "Server error fetching standups" });
    }
});
exports.getTimeoffListController = getTimeoffListController;
const getTimeoffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Standup does not exist" });
        return;
    }
    const newEntry = yield timeoff_models_1.Timeoff.findById(id);
    if (!newEntry) {
        res.status(404).json({ error: "No Timeoff FOUND" });
        return;
    }
    res.status(200).json(newEntry);
});
exports.getTimeoffController = getTimeoffController;
const createTimeoffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEntry = yield timeoff_models_1.Timeoff.create(Object.assign(Object.assign({}, req.body), { user: req.user.id }));
        console.log("CREATING....", Object.assign({}, req.body));
        res.status(200).json(newEntry);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating timeoff" });
    }
});
exports.createTimeoffController = createTimeoffController;
const updateTimeoffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such timeoff" });
        return;
    }
    const newEntry = yield timeoff_models_1.Timeoff.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!newEntry) {
        res.status(400).json({ error: "No such standup available" });
        return;
    }
    res.status(200).json(newEntry);
});
exports.updateTimeoffController = updateTimeoffController;
const deleteTimeoffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Standup does not exist" });
        return;
    }
    const newEntry = yield timeoff_models_1.Timeoff.findByIdAndDelete(id);
    if (!newEntry) {
        res.status(404).json({ error: "No standup found" });
        return;
    }
    res.status(200).json(newEntry);
});
exports.deleteTimeoffController = deleteTimeoffController;
