import { Food } from "../models/foodmodel.js";
import fs from  'fs'

// add food item

const addfood = async (req,res)=>{
    let imagename = `${req.file.filename}`;

    const food = new Food({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : imagename
    })

    try{
        await food.save();
        res.json({success   : true,message : "Food Added"})
        
    }catch(error){
        console.log(error);
        res.json({success : false,message : "Food not added"})
    }
}

const listfood = async (req,res)=>{
    try{
        const food = await Food.find({});
        res.json({success:true , data : food})
    }catch(error){
        console.log(error);
        res.json({success : false,message : "list is not  working"})
    }
}

const removefood = async (req,res)=>{
     try{
        const food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await Food.findByIdAndDelete(req.body.id);
        res.json({success: true,message : "Food removed"})
     }catch(error){
        console.log(error);
        res.json({success : false,message : "Food not removed"});
     }
}
export {addfood,listfood,removefood}