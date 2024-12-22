"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const auth_util_1 = require("../utils/auth-util");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.loginController);
router.post('/register', auth_controller_1.registerController);
router.get('/protected', auth_util_1.verifyToken, auth_controller_1.protectedRouteController);
router.post('/send-email', auth_controller_1.sendEmailController);
exports.default = router;
