import dotenv from 'dotenv' // Fixed typo: was 'dotnenv'
import express from "express";
import cors from 'cors'
import connectDB from "./Config/ConnectDB.js";
import serviceRoutes from "./Routes/ServiceRoute.js"
import planRoutes from "./Routes/PlanRoute.js";
import customPlanRoutes from "./Routes/CustomPlanRoutes.js";
import hireRequestRoutes from "./Routes/HireRequestRoutes.js";
import userRoute from "./Routes/UserRoute.js";
import paymentRoute from "./Routes/paymentRoute.js";
import bodyParser from 'body-parser';
import orderRoutes from "./Routes/OrderRoutes.js";
import contactRoutes from "./Routes/ContactRoutes.js";

dotenv.config()

const port = process.env.PORT || 3001

const app = express()

// middlewares 
app.use(cors())

app.use('/api/payment/webhook', bodyParser.raw({ type: 'application/json' }));

// Apply JSON parsing to all other routes
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({ message: "Hello from IT Solutions API" })
})

//routes
app.use('/api/auth', userRoute)
app.use("/api/services", serviceRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/custom-plans", customPlanRoutes);
app.use("/api/hire-requests", hireRequestRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoutes);
app.use("/api", contactRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB()
})