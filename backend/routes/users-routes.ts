import { Router } from 'express';
import { getUsersController } from '../controllers/users-controller'

const router = Router();

// event routes --> api/v1/
router.get('/users', getUsersController) // get all events route

export default router
