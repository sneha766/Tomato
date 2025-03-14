import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer relative top-40 h-90 ' id='footer'>
      <div className="footer-content pt-5 relative top-10 flex justify-around w-[80%] h-60">
        <div className='left text-white w-120 grid gap-5 relative left-20 top-3'>
            <img src={assets.logo} className='w-[30%] h-7 '></img>
            <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique deserunt distinctio quae officiis quos eaque, voluptatibus in rerum doloribus animi blanditiis pariatur totam voluptates consequuntur itaque neque dolores est eveniet. Nam eaque reprehenderit beatae facere dolorum laborum vitae quas illo.
            </p>
            <div className='grid grid-cols-3 w-30 gap-3'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className='center text-white flex flex-col justify-around relative left-15 bottom-3'>
            <h1 className='text-2xl'>COMPANY</h1>
            <ul  className='grid grid-rows-4 gap-2'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='right text-white flex flex-col justify-around relative left-35 bottom-3'>
            <h1 className='text-2xl'>GET IN TOUCH</h1>
            <ul className='grid grid-rows-4 gap-2'>
                <li>+1-212-4500-7890</li>
                <li>contact@greatstock.dev</li>
            </ul>
        </div>
      </div>
      <hr className='w-[80%] text-white relative top-20 left-30'/>
      <p className='text-white relative top-22 text-center text-sm'>Copyright 2025 &copy; Tomato.com-All Right Reserved. </p>
    </div>
  )
}

export default Footer
