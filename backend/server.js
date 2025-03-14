import express from 'express'
import cors from 'cors'
import connectdb from './config/db.js'
import foodRouter from './routes/food.route.js'
import UserRouter from './routes/user.route.js'
import 'dotenv/config'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())

app.get("/",(req,res)=>(
    res.send("API working")
))

//  db connection
connectdb();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",UserRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log("Server is running on port 4000");
})

