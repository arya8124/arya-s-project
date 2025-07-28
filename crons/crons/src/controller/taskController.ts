import { Request, Response } from 'express';
import Task from '../models/taskModel';
import { scheduleTask } from '../Task/scheduler';

export const createTask = async (req: Request, res: Response) => {
  const { name, schedule } = req.body;
  
  try {
    const task = await Task.create({ name, schedule });
    scheduleTask(task);
    res.status(201).json(task);
  } catch (err) {
    const error = err as Error; 
    res.status(500).json({ status:"hello",message: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ status:"hello", message: error.message });
  }
};
