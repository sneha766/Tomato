import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login
const loginUser = async (req,res)=>{
   const {email,password} = req.body;
   try{
    const user = await User.findOne({email});

    if(!user){
        return res.json({success:false,message : "User Dosen't exist"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
    }

    const token = createToken(user._id);
    res.json({success:true,token})
   }catch(error){
     console.log(error);
     res.json({success:false,message:"error"})
   }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const RegisterUser = async (req,res)=>{
    const {name,password,email} = req.body;
    try{
        const exists = await User.findOne({email});
        if(exists){
            return res.json({success : false,message : "User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success : false,message : "Please enter valid email"})
        }

        if(password.length < 8){
            return res.json({success : false,message : "Please enter strong password"})
        }

        const salt  = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name : name,
            email : email,
            password : hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success : true,token});
    }catch(error){
        res.json({success:false,message:"User not created"})
    }
}

export {loginUser,RegisterUser}
