import React from 'react'
import "./ExplorePage.css"
import { menu_list } from '../../assets/assets'
const ExplorePage = ({category,setcategory}) => {
  return (
    <div className='explorepage' id='explore-menu'>
        <div className="explore-contents relative top-20 flex-col gap-15 leading-7">
           <h1 className='text-bold text-4xl '>Explore our menu</h1>
           <p className='relative top-5 w-200'>Choose from a diverse menu featuring  delectable array of dishes crafted with the finest ingredients and culinary that satisfy your cravings and elevate your dining experience, one deleicious meal at a time.</p>
           <div className='menu-explore relative top-13 flex justify-between h-50 border-b-2 border-gray-300'>
            {
                menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index} className=' explore-image w-25 text-center cursor-pointer'>
                            <img src={item.menu_image}className={category===item.menu_name?"active":""}></img>
                            <p className=' text-gray-500 '>{item.menu_name}</p>
                        </div>
                    )
                })
            }
           </div>
        </div> 
        
    </div>
  )
}

export default ExplorePage
