import { Router } from "express";
import {
    getTodosController,
    getTodoController,
    deleteTodoController,
    updateTodoController,
    createTodoController,
}

from "../controllers/todo-controller";

const router = Router();

// event routes --> api/v1/
router.get("/todos", getTodosController); // get all todos route
router.get("/todos/:id", getTodoController); // get all todo route
router.delete("/todos/:id", deleteTodoController);
router.patch("/todos/:id", updateTodoController); // update todo controller
router.post("/todos", createTodoController); // delete todo controller

export default router;
