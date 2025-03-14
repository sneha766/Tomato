import mongoose from "mongoose";

const connectdb = async ()=>{
    (await mongoose.connect('mongodb+srv://snehagoyal711:sneha123@cluster0.h74ue.mongodb.net/food-del'))
    console.log("Db connected successfully");
}

export default connectdb