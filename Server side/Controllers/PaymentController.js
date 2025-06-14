import Stripe from "stripe";
import dotenv from "dotenv";
import { User } from "../Models/UserModel.js";
import { Service } from "../Models/ServiceModel.js";
import { Plan } from "../Models/PlanModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
  try {
    const { serviceId, planId, name, email, amount } = req.body;

    if (!serviceId || !planId || !name || !email || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find service and plan
    const service = await Service.findById(serviceId);
    const plan = await Plan.findById(planId);

    if (!service || !plan) {
      return res.status(404).json({ message: "Service or Plan not found" });
    }

    // Create Stripe PaymentIntent with metadata
    const paymentIntent = await stripe.paymentIntents.create({ 
      amount: amount * 100,
      currency: "usd",
      description: `Payment for ${plan.title} under ${service.title}`,
      metadata: {
        serviceId,
        planId,
        userId: user._id.toString(), // Store IDs for later
        amount: amount.toString()
      },
    });

    return res.status(200).json({ 
      clientSecret: paymentIntent.client_secret,
      message: "PaymentIntent created" 
    });
  } catch (error) {
    console.error("Payment Error.", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default createPayment;
