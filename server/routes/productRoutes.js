const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type || "",
      price: Number(req.body.price) || 0,
      offer: req.body.offer || "",
      size: req.body.size || "",
      color: req.body.color || "",
      description: req.body.description || "",
      image: req.body.image || "",
      stock: Number(req.body.stock) || 0,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const products = Array.isArray(req.body)
      ? req.body
      : [];

    if (!products.length) {
      return res.status(400).json({
        message: "No products provided",
      });
    }

    const formattedProducts = products.map((product) => ({
      name: product.name || "Unnamed Product",
      category:
        product.category ||
        product.type ||
        "Other Stationery",
      type: product.type || "",
      price: Number(product.price) || 0,
      offer: product.offer || "",
      size: product.size || "",
      color: product.color || "",
      description: product.description || "",
      image: product.image || "",
      stock: Number(product.stock) || 0,
    }));

    const savedProducts = await Product.insertMany(
      formattedProducts
    );

    res.status(201).json(savedProducts);
  } catch (error) {
    res.status(400).json({
      message: "Failed to import products",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        type: req.body.type || "",
        price: Number(req.body.price) || 0,
        offer: req.body.offer || "",
        size: req.body.size || "",
        color: req.body.color || "",
        description: req.body.description || "",
        image: req.body.image || "",
        stock: Number(req.body.stock) || 0,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product =
      await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

module.exports = router;