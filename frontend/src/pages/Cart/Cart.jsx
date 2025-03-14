import React, { useContext } from 'react'
import './Cart.css'
import {Storecontext} from '../../context/Storecontext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cartitem={},url,food_list,removetocart,gettotalcartamount} = useContext(Storecontext);

  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="item-title flex flex-row justify-between">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div><br/>
        <hr />
        {
          food_list.map((item,index)=>{
            if(cartitem[item._id]>0){
              return (
                <>
                <div key={item._id} className="cart-items-item ">
                  <img src={url + "images/" +item.image} alt="" className='w-10 h-10 rounded-3xl'/>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartitem[item._id]}</p>
                  <p>${cartitem[item._id]*item.price}</p>
                  <img className="cursor-pointer" src={assets.remove_icon_red} onClick={()=>removetocart(item._id)} alt="" />
                </div>
                <hr/>
                </>
              )   
            }
          })
        }
      </div>
      <div className="cart-total">
        <h2 className='text-3xl'>Cart Totals</h2>
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
          <button onClick={()=>navigate('/order')} className='w-50 h-10 bg-amber-600 text-white rounded-2xl'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
      <span className="cart-promocode absolute bottom-42 right-30">
        <h3 className='font-bold text-3md'>If you have a promo code. Enter it here</h3>
        <input type="text" placeholder='promo code' className='w-80 h-10 bg-gray-300 border-1 border-gray-300 text-black' />
        <button className='w-30 h-10 bg-black text-white'>Submit</button>
      </span>
    </div>
  )
}

export default Cart
