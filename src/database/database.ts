import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import * as mysql from 'mysql2'



dotenv.config();
// const sequelize = new Sequelize(
//     process.env.DB_NAME!, // Database name
//     process.env.DB_USER!, // Database user
//     process.env.DB_PASSWORD!, // Database password
//     {
//         host: process.env.DB_HOST!, // Host (e.g., localhost)
//         dialect: 'mysql', // Database dialect (mysql)
//         logging: false, // Disable logging (optional)
//     }
// );
const sequlaize = new Sequelize(
    'Bank', // Database name
    'mohamed', // Database user
    'momo', // Database password
    {
        host: '172.31.249.57', // Host (e.g., localhost)
        dialect: 'mysql', // Database dialect (mysql)
        logging: false, // Disable logging (optional)
    }
);
// Test the database connection
export const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;


