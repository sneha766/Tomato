import React, { useContext, useEffect, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios'
const Loginpopup = ({setshowLogin}) => {

    const {url,settoken} = useContext(Storecontext)
    const [currentstate,setcurrentstate] = useState("Sign Up")
    const[data,setdata] = useState({
      name : "",
      email : "",
      password : ""
    })

    const onchangeHandler = (event)=>{
      const name = event.target.name
      const value = event.target.value
      setdata(data=>({...data,[name]:value}))
    }

    const onlogin = async (event)=>{
      event.preventDefault()
      let newurl = url;
      if(currentstate==='Login'){
        newurl  += "api/user/login"
      }
      else{
        newurl += "api/user/register"
      }

      const response = await axios.post(newurl,data);
      if(response.data.success){
        settoken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setshowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }


  return (
    <div className='loginpopup absolute w-[100%] h-[100%] z-1 grid '>
        <form onSubmit={onlogin} action="" className="login-container bg-white place-self-center w-[30%] h-[400px] grid gap-2 border-1 border-amber-400">
            <div className="login-title">
                <h2 className='text-4xl '>{currentstate}</h2>
                <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-inputs grid gap-2 ">
              {currentstate==="Login"?<></>:<input onChange={onchangeHandler} name='name' value={data.name} type="text" placeholder='Your Name' required/>}
              <input onChange={onchangeHandler} name='email' value={data.email} type="text" placeholder='Your Email' required/>
              <input onChange={onchangeHandler} name='password' value={data.password} type="text" placeholder='Password' required />
            </div>
            <button type='submit' className=' border-1 border-gray-300 rounded-3xl w-40 cursor-pointer bg-amber-600 text-white'>{currentstate==="Sign Up"?"Create Account":"Login Account"}</button>
            <div className="login-condition ">
              <input type="checkbox" required />
              <span> By continuing , I agree to the terms of use & privacy policy</span>
            </div>
            {currentstate==="Sign Up"?<p className=''>Already have an account <span className='text-amber-600 cursor-pointer' onClick={()=>setcurrentstate("Login")}>Login here</span></p>:<p>Create an account <span className='text-amber-600 cursor-pointer' onClick={()=>setcurrentstate("Sign Up")}>Click here</span></p>}
        </form>
    </div>
  )
}

export default Loginpopup
