import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
const List = () => {
  const [list,setlist] = useState([])

  const url = "http://localhost:4000"
  const fetchlist = async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    
    if(response.data.success){
       setlist(response.data.data);
       
    }
    else{
       toast.error("Error");
    }
  }

  const removefood = async (foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchlist();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchlist();
  },[])


  return (
    <div className='list'>
      <p className='s'>All Food List</p>
      <div className="list-table ">
        <div className="list-table-format text-gray-500 font-light bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img className='w-10 h-7' src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p  onClick={()=>removefood(item._id)} className='cursor-pointer'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List
