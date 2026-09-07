const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cors());
app.use(express.json());

// =========================================================
// ROOT
// =========================================================

app.get("/", (req, res) => {
  res.json({
    message: "Shankar Book Store API is running",
  });
});

// =========================================================
// PRODUCT ROUTES
// =========================================================

app.use("/api/products", productRoutes);

// =========================================================
// ORDER ROUTES
// =========================================================

app.use("/api/orders", orderRoutes);

// =========================================================
// SERVER
// =========================================================

const PORT = process.env.PORT || 5000;

// =========================================================
// MONGODB CONNECTION
// =========================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });