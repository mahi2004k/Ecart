import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./database/db.js";

import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://ecart-frontend-red.vercel.app",
      "https://luminous-gelato-092b09.netlify.app",
      "https://reliable-pie-8ce366.netlify.app",
      "https://dancing-hotteok-685e62.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);

// start server
const startServer = async () => {
  try {
    // connect database first
    await connectDB();

    // then start server
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });

  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
};

startServer();