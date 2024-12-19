import { Router } from 'express';
import {getStoriesController } from '../controllers/story-controller'

const router = Router();

// event routes --> api/v1/
router.get('/stories',getStoriesController) // get all events route

export default router
