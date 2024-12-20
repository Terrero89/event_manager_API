import { Router } from "express";
import {loginController, protectedRouteController, registerController} from '../controllers/auth-controller'
const router = Router();

router.post('/login', loginController)
router.post('/register', registerController);
router.get('/protected', protectedRouteController);

export default router;