import express from "express"
import autthMiddleware from "../middlewares/auth.js";
import { addtocart,removefromcart,getcart } from "../controllers/cart.controller.js"

const cartRouter = express.Router();

cartRouter.post("/add",autthMiddleware,addtocart);
cartRouter.post("/remove",autthMiddleware,removefromcart);
cartRouter.post("/get",autthMiddleware,getcart);

export default cartRouter