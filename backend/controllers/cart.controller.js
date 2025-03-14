import { User } from "../models/user.model.js";

const addtocart = async (req,res)=>{
    try {
        let userdata = await User.findOne({_id:req.body.userId})
        let cartData = await userdata.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message : "Added to Cart"})
    } catch (error) {
        console.log(error);
        res.json({success : false,message : "Error"})
    }
}

const removefromcart = async (req,res)=>{
    try {
        let userdata = await User.findOne({_id:req.body.userId})
        let cartData = await userdata.cartData;
        if(!cartData[req.body.itemId]){
            res.json({success:false,message : "Item is not in cart"})
        }
        else{
            cartData[req.body.itemId] -= 1;
        }
        await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message : "removed from Cart"})
    } catch (error) {
        console.log(error);
        res.json({success : false,message : "Error"})
    }
}

const getcart = async (req,res)=>{
    try {
        let userdata = await User.findOne({_id:req.body.userId})
        let cartData = await userdata.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success : false,message : "Error"})
    }
}

export {addtocart,removefromcart,getcart}