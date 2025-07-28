import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('exceltomysql', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
