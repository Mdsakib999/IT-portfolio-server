import express from "express";
import dotnenv from 'dotenv'
import cors from 'cors'
import connectDB from "./Config/ConnectDB.js";
import serviceRoutes from "./Routes/ServiceRoute.js"
import planRoutes from "./Routes/PlanRoute.js";
import customPlanRoutes from "./Routes/CustomPlanRoutes.js";
import hireRequestRoutes from "./Routes/HireRequestRoutes.js";
import userRoute from "./Routes/UserRoute.js";

dotnenv.config()

const port = process.env.PORT || 3001

const app = express()

// middlewares 
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/auth', userRoute)

app.get('/', (req, res) => {
    res.send({ message: "Hello from IT Solutions API" })
})


//routes
app.use("/api/services", serviceRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/custom-plans", customPlanRoutes);
app.use("/api/hire-requests", hireRequestRoutes);





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB()
})