import { Request, Response, NextFunction } from 'express';
import { logTaskOutput } from '../utils/logger';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  console.log(`${method} ${url}`);
  next();
};

export const logOutputMiddleware = (output: string) => {
  logTaskOutput(output);
};
