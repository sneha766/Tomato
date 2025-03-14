import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios  from 'axios'
import { toast } from 'react-toastify'
const Add = () => {

    const url = "http://localhost:4000"
    const [image,setimage] = useState(false);
    const [data,setdata] = useState({
        name : "",
        description : "",
        price : "",
        category : "Noodles"
    })
    
    const onchangehandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setdata(data=>({...data,[name]:value}))
    }
    const onsubmitHandler = async (event)=>{
       event.preventDefault();
       const formdata = new FormData();
       formdata.append("name",data.name)
       formdata.append("description",data.description)
       formdata.append("price",Number(data.price))
       formdata.append("category",data.category)
       formdata.append("image",image)
       const response = await axios.post(`${url}/api/food/add`,formdata)
       if(response.data.success){
         setdata({
            name : "",
            description : "",
            price : "",
            category : "Noodles" 
         })
         setimage(false);
         toast.success(response.data.message)
       }else{
        toast.error(response.data.message)
       }
    }
  return (
    <div className='add'>
      <form className="add-some flex-col text-md" onSubmit={onsubmitHandler}>
        <div className='add-img-upload'>
           <p className=''>Upload Image</p>
           <label htmlFor="image"><img src={image?URL.createObjectURL(image):assets.upload_area} alt="" className='w-30 h-20'/></label>
           <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="product-name">
            <p>Product Name</p>
            <input name="name" onChange={onchangehandler} value={data.name} type="text" placeholder='Type here' required className='t border-1 border-gray-600 w-100 h-10 ' />
        </div>
        <div className="product-des">
            <p>Product Description</p>
            <textarea name="description" rows='3'placeholder='Write content here' required className=' t border-1 border-gray-600 w-100' onChange={onchangehandler} value={data.description}></textarea>
        </div>
        <div className="flex justify-between">
            <div className="category ">
                <p>Product Category</p>
                <select name="category" className='border-1 border-gray-600 t text-gray-500 ' onChange={onchangehandler} value={data.category}>
                    <option value="Noodle">Noodles</option>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                </select>
            </div>
            <div className="price">
            <p>Product Price</p>
            <input name='price' type="number" onChange={onchangehandler} value={data.price} placeholder='$20' className='border-1 border-gray-600 w-20 h-8 t'/>
            </div>
        </div>
        <button type='submit' className='b border-1 border-gray-600 bg-black text-white w-30 h-10 cursor-pointer hover:scale-110 delay-125'>ADD</button>
      </form>
    </div>
  )
}

export default Add
