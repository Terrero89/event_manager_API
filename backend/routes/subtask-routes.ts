import { Router } from 'express';
import { getHomeController, getEventsController } from '../controllers/subtask-controller'

const router = Router();

// event routes --> api/v1/
router.get('/', getHomeController) // home route
router.get('/tasks', getEventsController) // get all events route

export default router
