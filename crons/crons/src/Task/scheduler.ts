import cron from 'node-cron';
import Task from '../models/taskModel';
import { logOutputMiddleware } from '../middleware/loggerMiddleware';

export const scheduleTask = (task: Task) => {
  cron.schedule(task.schedule, async () => {
    const output = `Task "${task.name}" executed at ${new Date().toISOString()}`;
    logOutputMiddleware(output);
    
    console.log(output);
    // Update task output in the database
    task.output = output;
    await task.save();
  });
};
