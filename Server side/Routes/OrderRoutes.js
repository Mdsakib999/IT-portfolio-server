import express from "express";
import { getAllOrders, getOrderByPaymentIntent, getUserOrders } from "../Controllers/OrderController.js";

const router = express.Router();

// Route to create a payment intent
router.get("/get-order", getOrderByPaymentIntent);
router.get("/all-order", getAllOrders);
router.get("/:id", getUserOrders);


export default router;
