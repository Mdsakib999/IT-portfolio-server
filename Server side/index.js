import express from "express";
import dotnenv from 'dotenv'
import cors from 'cors'
import userRoute from "./Routes/UserRoute.js";
import connectDB from "./Config/ConnectDB.js";

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB()
})