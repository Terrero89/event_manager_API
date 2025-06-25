import { Router } from "express";
import {loginController, logoutController, protectedRouteController, registerController, sendEmailController} from '../controllers/auth-controller'


const router = Router();

router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/register', registerController);
router.get('/protected', protectedRouteController);
router.post('/send-email', sendEmailController );

export default router;