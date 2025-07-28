import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './src/routes/taskRoutes';
import sequelize from './src/config/config';
import { logger } from './src/middleware/loggerMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);
app.use('/api/crons', taskRoutes);
                                                                
const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
