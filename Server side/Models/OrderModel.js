import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Service",
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Plan",
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    // Stripe fields
    stripePaymentIntentId: {
        type: String,
        required: true,
        unique: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "succeeded", "failed"],
        default: "pending"
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    }
}, { timestamps: true });


export const Order = mongoose.model("Order", orderSchema);
