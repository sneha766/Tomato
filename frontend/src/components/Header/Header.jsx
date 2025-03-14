import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header relative top-10  rounded-2xl text-white '>
      <div className="header-contents w-150 relative top-20 left-15">
        <h2 className='font-medium text-6xl leading-20 max-lg:leading-8'>Order your <br></br>favourite food here</h2>
        <p className='relative top-3'>Choose from a diverse menu featuring  delectable array of dishes crafted with the finest ingredients and culinary that satisfy your cravings and elevate your dining experience, one deleicious meal at a time.</p>
        <button className='border-1 border-amber-50 bg-white rounded-3xl text-black w-30 h-10 relative top-5'>View Menu</button>
      </div>
    </div>
  )
}

export default Header
