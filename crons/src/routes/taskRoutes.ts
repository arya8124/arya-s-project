import { Router } from 'express';
import { createTask, getTasks } from '../controller/taskController';

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);

export default router;
