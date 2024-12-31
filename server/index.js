const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
const fragranceRoutes = require("./routes/fragranceRoutes"); // Import the routes
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use("/api/fragrances", fragranceRoutes);
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Test query directly after connection
    // const testData = await mongoose.connection.db
    //   .collection("fragrance-db") // Explicitly query the collection
    //   .find({})
    //   .toArray();
    // console.log("Test data from DB:", testData); // Should log the existing documents

    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
