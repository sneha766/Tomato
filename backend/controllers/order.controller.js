import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeorder = async (req,res)=>{

    const frontend_url = "http://localhost:5173";
    try {
        const neworder = new Order({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address
        })
        await neworder.save();
        await User.findByIdAndUpdate(req.body.userId,{cartData :{}});

        const line_items = req.body.items.map((item)=>({
            price_data : {
                currency : "AUD",
                product_data :{ 
                    name: item.name
                },
                unit_amount : item.price*100
            },
            quantity : item.quantity

        }))

        line_items.push({
            price_data : {
                currency : "AUD",
                product_data:{
                    name : "Delivery Charges"
                },
                unit_amount : 5*100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode : 'payment',
            success_url : `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
            cancel_url : `${frontend_url}/verify?success=false&orderId=${neworder._id}`
        })

        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"}) 
    }
}

const verifyOrder = async (req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success=="true" || success == true){
            await Order.findByIdAndUpdate(orderId,{payment : true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await Order.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const userorder = async (req,res)=>{
    try {
        const orders = await Order.find({userId:req.body.userId});
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const adminorders = async (req,res)=>{
    try {
        const orders = await Order.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const updatestatus = async (req,res)=>{
    try {
        await Order.findByIdAndUpdate(req.body.orderId,{status : req.body.status})
        res.json({success:true,message:"status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {placeorder, verifyOrder,userorder,adminorders,updatestatus}