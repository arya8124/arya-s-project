import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

const dbName: string | undefined = process.env.DB_NAME;
const dbUser: string | undefined = process.env.DB_USER;
const dbPassword: string | undefined = process.env.DB_PASSWORD;
const dbHost: string | undefined = process.env.DB_HOST;
const dbPort: string | undefined = process.env.DB_PORT;

if (!dbName || !dbUser || dbHost === undefined || dbPort === undefined) {
    console.error("Database configuration is missing. Please check your .env file.");
    process.exit(1);
}

// dbPort to number
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: parseInt(dbPort, 10),
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
