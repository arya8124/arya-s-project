import express from 'express';
import { Sequelize } from 'sequelize';
import fileRouter from './routes/fileRoutes';

const app = express();
const port = 8000;

// Set up Sequelize
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'clouding',
});

// Middlewares
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/files', fileRouter);

// Sync sequelize models
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
