import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className='navbar flex  justify-between' >
      <img className='logo' src={assets.logo}/>
      <img className='profile w-15 h-15' src={assets.profile_image} />
    </div>
  )
}

export default Navbar
