const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Original/local product ID
    legacyId: {
      type: String,
      default: "",
      trim: true,
    },

    // Product name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Main category
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Product type
    type: {
      type: String,
      default: "",
      trim: true,
    },

    // Price
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Offer text
    offer: {
      type: String,
      default: "",
      trim: true,
    },

    // Size
    size: {
      type: String,
      default: "",
      trim: true,
    },

    // Color
    color: {
      type: String,
      default: "",
      trim: true,
    },

    // Number of pages
    pages: {
      type: Number,
      default: null,
      min: 0,
    },

    // Pattern / variant information
    pattern: {
      type: String,
      default: "",
      trim: true,
    },

    // Description
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Product image
    image: {
      type: String,
      default: "",
      trim: true,
    },

    // Stock quantity
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);