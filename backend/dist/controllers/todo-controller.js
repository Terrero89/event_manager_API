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
exports.deleteTodoController = exports.updateTodoController = exports.createTodoController = exports.getTodoController = exports.getTodosController = void 0;
const todo_models_1 = require("../models/todo-models");
const mongoose_1 = __importDefault(require("mongoose"));
const getTodosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield todo_models_1.Todo.find({}).sort({ createdAt: -1 });
        res.status(200).json(allTodos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Todos" });
    }
});
exports.getTodosController = getTodosController;
const getTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //grabbing id params from the request object
    //?handling error if no id is found
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }
    const todo = yield todo_models_1.Todo.findById(id); //finding by specific id from params
    //error handling for not id found
    if (!todo) {
        res.status(404).json({ error: "NO TODO FOUND" });
        return;
    }
    res.status(200).json(todo); //return that specific id from tODO
});
exports.getTodoController = getTodoController;
const createTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, dueDate, priorityLevel, status, relatedStoryId } = req.body;
    // MORE ERROR HANDLING COMING UP
    try {
        const todo = yield todo_models_1.Todo.create({
            title,
            description,
            date,
            dueDate,
            priorityLevel,
            status,
            relatedStoryId
        });
        res.status(200).json(todo);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createTodoController = createTodoController;
const updateTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //check if exist in mongoose
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such todo" });
        return;
    }
    //__id == mongoDB Id/ update id === __id
    const todo = yield todo_models_1.Todo.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    //if no todo, throw error
    if (!todo) {
        res.status(400).json({ error: "No such story available" });
        return;
    }
    res.status(200).json(todo);
});
exports.updateTodoController = updateTodoController;
const deleteTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo does not exist" });
        return;
    }
    const todo = yield todo_models_1.Todo.findByIdAndDelete(id);
    if (!todo) {
        res.status(404).json({ error: "No todo found" });
        return;
    }
    res.status(200).json(todo);
});
exports.deleteTodoController = deleteTodoController;
