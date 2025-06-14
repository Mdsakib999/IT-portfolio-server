import { Order } from "../Models/OrderModel.js";

const getOrderByPaymentIntent = async (req, res) => {
  try {
    const { payment_intent } = req.query;
    console.log("payment_intent:::=>", payment_intent);

    if (!payment_intent) {
      return res.status(400).json({ message: "Payment intent is required" });
    }

    const order = await Order.findOne({ stripePaymentIntentId: payment_intent })
      .populate("plan")
      .populate("service")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ❌ Do NOT change order status here — let webhook handle it
    res.status(200).json({ order });
  } catch (error) {
    console.error("Error in getOrderByPaymentIntent:", error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

const getUserOrders = async(req,res) =>{
    const userId = req.params.id;
    const allOrders = await Order.find({user: userId}).populate("plan", "title").populate("service", "title")
    res.send(allOrders)
}

const getAllOrders = async(req,res) =>{
    const allOrders = await Order.find({})
    res.send(allOrders)
}

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { 
  getOrderByPaymentIntent, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus,
  deleteOrder 
};
