const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const STOCK_VALUE = 10;

async function updateStock() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log("MongoDB connected");

    const result =
      await Product.updateMany(
        {},
        {
          $set: {
            stock: STOCK_VALUE,
          },
        }
      );

    console.log(
      `Matched products: ${result.matchedCount}`
    );

    console.log(
      `Updated products: ${result.modifiedCount}`
    );

    console.log(
      `Stock set to: ${STOCK_VALUE}`
    );

    console.log(
      "All products stock updated successfully."
    );
  } catch (error) {
    console.error(
      "Stock update failed:",
      error.message
    );
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

updateStock();