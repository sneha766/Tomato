import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'
const FoodItem = ({id,name,price,description,image}) => {
  
  const {cartitem,addtocart,removetocart,url} = useContext(Storecontext)


  return (
    <div className="food-item rounded-2xl overflow-hidden flex flex-col gap-3 shadow-md transition duration-300 animate-fadein">
  {/* Image Container */}
  <div className="food-img-container relative">
    <img src={url + "images/" + image} className="food-image w-full" />

    {/* White Add Icon (Overlay) */}
    {!cartitem[id] ? (
      <img
        src={assets.add_icon_white}
        className="add cursor-pointer absolute bottom-2 right-2"
        onClick={() => {
          addtocart(id);
        }}
      />
    ) : (
      <div className="food-counter w-26 rounded-2xl absolute bottom-2 right-2 bg-white p-1">
        <div className="flex flex-row gap-2 w-25 h-9 rounded-2xl items-center justify-center">
          <img
            onClick={() => removetocart(id)}
            src={assets.remove_icon_red}
            className="cursor-pointer h-7"
            alt=""
          />
          <p className="text-xl">{cartitem[id]}</p>
          <img
            onClick={() => addtocart(id)}
            src={assets.add_icon_green}
            className="cursor-pointer h-7"
            alt=""
          />
          
          
        </div>
      </div>
    )}
  </div>

  {/* Food Info */}
  <div className="info flex flex-col gap-3 relative left-1">
    <div className="name-rating flex flex-wrap justify-between">
      <p className="text-xl">{name}</p>
      <img src={assets.rating_starts} alt="" className="w-20 h-4 relative top-2 right-2" />
    </div>
    <p className="des text-sm text-gray-500 w-60">{description}</p>
    <p className="price text-red-700 text-3xl relative bottom-1">${price}</p>
  </div>
</div>

  )
}

export default FoodItem
