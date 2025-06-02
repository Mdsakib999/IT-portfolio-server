import express from "express";
import dotnenv from 'dotenv'
import cors from 'cors'
import Stripe from "stripe";

dotnenv.config()

const port = process.env.PORT || 3001

const app = express()

// middlewares
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send({ message: "Hello from IT Solutions API" })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    // connectDB()
})