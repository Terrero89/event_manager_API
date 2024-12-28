"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const router = (0, express_1.Router)();
// event routes --> api/v1/
router.get('/users', users_controller_1.getUsersController); // get all events route
exports.default = router;
