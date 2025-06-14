import Stripe from "stripe";
import dotenv from "dotenv";
import { Order } from "../Models/OrderModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeWebhook = async (req, res) => {
  console.log("ENTERED INTO WEBHOOK");

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle payment success
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    console.log("✅ PaymentIntent succeeded.", paymentIntent.id);

    const serviceId = paymentIntent.metadata.serviceId;
    const planId = paymentIntent.metadata.planId;
    const userId = paymentIntent.metadata.userId;
    const amount = parseFloat(paymentIntent.metadata.amount);

    // Create order after successful payment
    const newOrder = new Order({ 
      user: userId,
      service: serviceId,
      plan: planId,
      price: amount,
      description: `Payment for plan under service`,
      stripePaymentIntentId: paymentIntent.id,
      paymentStatus: "succeeded",
      status: "completed",
    });

    await newOrder.save();

    console.log("✅ Order successfully created.");
  }

  res.status(200).json({ received: true });
};

export default stripeWebhook;
