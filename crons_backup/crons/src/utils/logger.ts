import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, '../logs/tasks.log');

export const logTaskOutput = (output: string) => {
  fs.appendFile(logFilePath, output + '\n', (err) => {
    if (err) {
      console.error('Failed to write to log:', err);
    }
  });
};
