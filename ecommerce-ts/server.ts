import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import reviewRoutes from "./routes/review";
import purchaseRoutes from "./routes/purchase";
import sequelize from "./config/db";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/purchase", purchaseRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error: Error) => {
    console.error("Unable to start the server:", error);
  });
