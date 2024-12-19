import { Router } from 'express';
import { getTasksController } from '../controllers/task-controller'

const router = Router();

// event routes --> api/v1/
router.get('/tasks', getTasksController) // get all events route

export default router
