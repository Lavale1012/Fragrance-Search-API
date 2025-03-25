import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import fragranceRoutes from "./routes/fragranceRoutes.js";
import AiFragranceRoutes from "./routes/fragranceAiRoutes.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data

// Define routes
app.use("/api/fragrances", fragranceRoutes);
app.use("/api/ai/fragrance", AiFragranceRoutes);

const PORT = process.env.PORT || 10000; // Set the server port
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB connection URI

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI) // Use updated options, { useNewUrlParser: true, useUnifiedTopology: true }
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
