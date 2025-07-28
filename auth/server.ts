import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/authroutes";
import sequelize from "./src/config/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Defining routes
app.use("/api/auth", authRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });
