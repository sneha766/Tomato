import React, { useContext } from 'react'
import './FoodDisplay.css'
import { Storecontext } from '../../context/Storecontext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(Storecontext)
  return (
    <div className='food-display relative top-28 '>
      <h1 className="near text-4xl">Top dishes near you</h1>
      <div className="food-display-list grid grid-cols-4 gap-5 relative top-7">
        {
            food_list.map((item,index)=>{
              if(category==="All" || category===item.category){
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}  />}
              }
              
            )
        }
      </div>
    </div>
  )
}

export default FoodDisplay
