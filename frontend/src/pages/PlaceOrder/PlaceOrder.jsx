import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const {gettotalcartamount,token,food_list,cartitem,url} = useContext(Storecontext)

  const [data,setdata] = useState({
    firstname : "",
    lastname : "",
    email :"",
    street : "",
    city : "",
    state : "",
    zipcode : "",
    country : "",
    phone : ""
  })

  const placeorder = async (event) => {
    event.preventDefault();
  
    try {
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartitem[item._id] > 0) {
          let iteminfo = { ...item, quantity: cartitem[item._id] };
          orderItems.push(iteminfo);
        }
      });
  
      let orderdata = {
        address: data,
        items: orderItems,
        amount: gettotalcartamount() + 5,
      };
  
      console.log("Sending Order Data:", orderdata); // Debugging log
  
      let response = await axios.post(url + "api/order/place", orderdata, {
        headers: { token },
      });
  
      console.log("API Response:", response.data); // Debugging log
  
      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Order placement failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Order Placement Error:", error);
      alert("Something went wrong! Check console.");
    }
  };
  

  const onchangehandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setdata(data=>({...data,[name]:value}))
  }
  const navigate = useNavigate();
  useEffect(()=>{
   if(!token){
     navigate('/Cart')
   }
   else if(gettotalcartamount()===0){
    navigate('/Cart')
   }
   
  },[token])
  return (
    <form onSubmit={placeorder} className='order flex gap-30'>
      <div className="delivery-info ">
        <h1 className='text-3xl'>Delivery Information</h1>
        <div className="multi-input">
          <input required onChange={onchangehandler} name='firstname' value={data.firstname} type="text" placeholder='First name'/>
          <input required onChange={onchangehandler} name='lastname' value={data.lastname} type="text" placeholder='Last Name'/>
        </div>
        <input required onChange={onchangehandler} name='email' value={data.email} type="text" placeholder='Email address' />
        <input required onChange={onchangehandler} name='street' value={data.street} type="text" placeholder='Street'/>
        <div className="multi-input">
          <input required onChange={onchangehandler} name='city' value={data.city} type="text" placeholder='City'/>
          <input required onChange={onchangehandler} name='state' value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-input">
          <input required onChange={onchangehandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required onChange={onchangehandler} name='country' value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required onChange={onchangehandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="order-right">
        <h1  className='text-3xl'>Cart Total</h1>
      <div className='some w-90 grid gap-3'>
          <div className="cart-total-details flex justify-between">
            <p>SubTotal</p>
            <p>${gettotalcartamount()}</p>
          </div><hr/>
          <div className="cart-total-details flex justify-between">
            <p>Delivery Fee</p>
            <p>${gettotalcartamount()>0?5:0}</p>
          </div><hr/>
          <div className="cart-total-details flex justify-between">
            <p>Total</p>
            <p>${gettotalcartamount()>0?gettotalcartamount()+5:0}</p>
          </div>
          <button type='submit' className='w-50 h-10 bg-amber-600 text-white rounded-2xl'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
