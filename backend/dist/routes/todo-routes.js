"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get("/todos", todo_controller_1.getTodosController); // get all todos route
router.get("/todos/:id", todo_controller_1.getTodoController); // get all todo route
router.delete("/todos/:id", todo_controller_1.deleteTodoController);
router.patch("/todos/:id", todo_controller_1.updateTodoController); // update todo controller
router.post("/todos", todo_controller_1.createTodoController); // delete todo controller
exports.default = router;
