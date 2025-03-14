import express from 'express'
import autthMiddleware from '../middlewares/auth.js';
import {adminorders, placeorder,updatestatus,userorder,verifyOrder} from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post("/place",autthMiddleware,placeorder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",autthMiddleware,userorder)
orderRouter.get("/list",adminorders)
orderRouter.post("/status",updatestatus)
export default orderRouter