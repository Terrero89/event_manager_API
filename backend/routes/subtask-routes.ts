import { Router } from 'express';
import { getHomeController, getTasksController } from '../controllers/subtask-controller'

const router = Router();

// event routes --> api/v1/
router.get('/', getHomeController) // home route
router.get('/tasks', getTasksController) // get all events route

export default router
