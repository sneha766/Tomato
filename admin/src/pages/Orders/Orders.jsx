import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'
const Orders = ({url}) => {
  const [orders,setorders] = useState([])
  const fetchallorders = async ()=>{
     const response = await axios.get(url +  "/api/order/list")
     if(response.data.success){
      setorders(response.data.data);
      console.log(response.data.data);
     }
     else{
      toast.error("Error")
     }
  }

  useEffect(()=>{
    fetchallorders();
  },[])

  const statusHandler = async (event,orderId)=>{
    const response = await axios.post(url + "/api/order/status",{
      orderId ,
      status : event.target.value
    })
    if(response.data.success){
       await fetchallorders();
    }
    
  }
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order,index)=>{
            return (
              <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {
                    order.items.map((item,index)=>{
                      if(index ===  order.items.length-1){
                        return item.name + " x " + item.quantity
                      }
                      else{
                        return item.name + " x " + item.quantity + " , "
                      }

                    })
                  }
                </p>
                <p className="order-item-name">
                  {order.address.firstname + " " + order.address.lastname}
                </p>
                <p className="order-item-address">
                  {order.address.street + " , " + order.address.city + " , " + order.address.state + " , " + order.address.country + " , " + order.address.zipcode }
                </p>
                <p className='order-item-phone'>
                  {order.address.phone}
                </p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}.00</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders
