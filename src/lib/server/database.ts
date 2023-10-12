
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const myURI: string = import.meta.env.VITE_DB_URL;

if (!myURI) {
    throw new Error("Database URL not found in environment variables.");
}

export const sequelize = new Sequelize(myURI, {
  logging: false
});

export const dbConn = async (): Promise<void> => {
    try {
       await sequelize.authenticate();
      console.log('Database connection established and tables loaded');
    } catch (e: unknown) {
      const error = e as Error;
      console.error('Unable to connect to db because of error: ' + error.message);
    }
};
