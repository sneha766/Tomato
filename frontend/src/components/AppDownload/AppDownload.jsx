import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div id='app-download' className='app-download relative top-50 w-[70%] text-center left-55 grid grid-rows-2 gap-10'>
      <h1 className='text-5xl leading-15'>For Better Experience Download Tomato App</h1>
      <div className='grid grid-cols-2 w-[60%] relative left-35'>
        <img src={assets.play_store} alt="" className='w-45  h-15 cursor-pointer hover:scale-110 transition delay-3s'/>
        <img src={assets.app_store} alt="" className='w-45  h-15 cursor-pointer hover:scale-110 transition delay-3s'/>
      </div>
    </div>
  )
}

export default AppDownload
