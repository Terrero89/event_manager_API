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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDaysOffController = exports.updateDaysOffController = exports.getDaysOffController = exports.getDaysOffListController = exports.createDaysOffController = void 0;
const daysoff_model_1 = require("../models/daysoff-model");
const createDaysOffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const daysOff = yield daysoff_model_1.DaysOff.create(Object.assign(Object.assign({}, req.body), { user: req.user.id }));
        res.status(200).json(daysOff);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating daysOff" });
    }
});
exports.createDaysOffController = createDaysOffController;
const getDaysOffListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const daysOffList = yield daysoff_model_1.DaysOff.find({}).sort({ createdAt: -1 });
        res.status(200).json(daysOffList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching daysOff list" });
    }
});
exports.getDaysOffListController = getDaysOffListController;
const getDaysOffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: No daysOff found' });
        return;
    }
    try {
        const daysOff = yield daysoff_model_1.DaysOff.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(daysOff);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching daysOff" });
    }
});
exports.getDaysOffController = getDaysOffController;
const updateDaysOffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedDaysOff = yield daysoff_model_1.DaysOff.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedDaysOff);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating daysOff" });
    }
});
exports.updateDaysOffController = updateDaysOffController;
const deleteDaysOffController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield daysoff_model_1.DaysOff.findByIdAndDelete(id);
        res.status(200).json({ message: "DaysOff deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting daysOff" });
    }
});
exports.deleteDaysOffController = deleteDaysOffController;
