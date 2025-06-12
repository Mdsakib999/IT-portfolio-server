import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from "../Controllers/OrderController.js";

const router = express.Router();

// Create order
router.post("/", createOrder);

// All orders
router.get("/", getAllOrders);

// Order by ID
router.get("/:id", getOrderById);

// Update order status
router.patch("/:id", updateOrderStatus);

// Delete order
router.delete("/:id", deleteOrder);

export default router;
