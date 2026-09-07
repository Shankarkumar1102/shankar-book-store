const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");

const router = express.Router();

// =========================================================
// CREATE ORDER
// POST /api/orders
// =========================================================

router.post("/", async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      deliveryCharge,
      total,
      paymentMethod,
    } = req.body;

    // Customer validation
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer details are required",
      });
    }

    if (!customer.name || !customer.mobile) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name and mobile are required",
      });
    }

    if (!customer.address || !customer.area) {
      return res.status(400).json({
        success: false,
        message:
          "Address and area are required",
      });
    }

    // Items validation
    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order must contain at least one product",
      });
    }

    // Create order
    const order = await Order.create({
      customer,
      items,
      subtotal: Number(subtotal) || 0,
      deliveryCharge:
        Number(deliveryCharge) || 0,
      total: Number(total) || 0,
      paymentMethod:
        paymentMethod || "COD",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// =========================================================
// GET ALL ORDERS
// GET /api/orders
// =========================================================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    // IMPORTANT:
    // Admin.jsx expects the orders array directly.
    res.json(orders);
  } catch (error) {
    console.error(
      "Get orders error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// =========================================================
// GET SINGLE ORDER
// GET /api/orders/:id
// =========================================================

router.get("/:id", async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "Get single order error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

// =========================================================
// UPDATE ORDER STATUS
// PATCH /api/orders/:id/status
// =========================================================

router.patch(
  "/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ];

      if (
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }

      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            status,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // IMPORTANT:
      // Admin.jsx expects updated order directly.
      res.json(order);
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update order status",
        error: error.message,
      });
    }
  }
);

// =========================================================
// DELETE ORDER
// DELETE /api/orders/:id
// =========================================================

router.delete(
  "/:id",
  async (req, res) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      const order =
        await Order.findByIdAndDelete(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: true,
        message:
          "Order deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete order error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete order",
        error: error.message,
      });
    }
  }
);

// =========================================================
// EXPORT
// =========================================================

module.exports = router;