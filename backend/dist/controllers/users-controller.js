"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = exports.getUsersController = void 0;
const getUsersController = (req, res) => {
    res.send("GET USERS");
};
exports.getUsersController = getUsersController;
const createUserController = (req, res) => {
    res.send("CREATE USER");
};
exports.createUserController = createUserController;
