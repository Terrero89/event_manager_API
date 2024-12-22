import { Router } from "express";
import {loginController, protectedRouteController, registerController, sendEmailController} from '../controllers/auth-controller'
import { verifyToken} from '../utils/auth-util'

const router = Router();

router.post('/login', loginController)
router.post('/register', registerController);
router.get('/protected', verifyToken, protectedRouteController);
router.post('/send-email', sendEmailController );

export default router;