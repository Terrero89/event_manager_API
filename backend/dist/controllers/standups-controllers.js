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
exports.deleteStandupController = exports.updateStandupController = exports.createStandupController = exports.getStandupController = exports.getStandupsController = void 0;
const standups_models_1 = require("../models/standups-models");
const mongoose_1 = __importDefault(require("mongoose"));
const getStandupsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    //   if (!userId) {
    //     res.status(401).json({ message: 'Unauthorized: No user ID found' });
    //     return;
    //   }
    try {
        const standupList = yield standups_models_1.Standup.find({}).sort({ createdAt: -1 });
        res.json(standupList);
    }
    catch (err) {
        console.error("Error fetching standups:", err);
        res.status(500).json({ message: "Server error fetching standups" });
    }
});
exports.getStandupsController = getStandupsController;
const getStandupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Standup does not exist" });
        return;
    }
    const standup = yield standups_models_1.Standup.findById(id);
    if (!standup) {
        res.status(404).json({ error: "No Standup FOUND" });
        return;
    }
    res.status(200).json(standup);
});
exports.getStandupController = getStandupController;
const createStandupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const standup = yield standups_models_1.Standup.create(Object.assign({}, req.body));
        console.log("CREATING....", Object.assign({}, req.body));
        res.status(200).json(standup);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating standup" });
    }
});
exports.createStandupController = createStandupController;
const updateStandupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such standup" });
        return;
    }
    const standup = yield standups_models_1.Standup.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!standup) {
        res.status(400).json({ error: "No such standup available" });
        return;
    }
    res.status(200).json(standup);
});
exports.updateStandupController = updateStandupController;
const deleteStandupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Standup does not exist" });
        return;
    }
    const standup = yield standups_models_1.Standup.findByIdAndDelete(id);
    if (!standup) {
        res.status(404).json({ error: "No standup found" });
        return;
    }
    res.status(200).json(standup);
});
exports.deleteStandupController = deleteStandupController;
