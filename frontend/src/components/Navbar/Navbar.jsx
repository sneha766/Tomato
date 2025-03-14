import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, Links, useNavigate } from 'react-router-dom'
import { Storecontext } from '../../context/Storecontext'
const Navbar = ({setshowLogin}) => {
    const[menu , setmenu] = useState("menu")
    const navigate = useNavigate();
    const {gettotalcartamount,token,settoken} = useContext(Storecontext);

    const logout = ()=>{
      localStorage.removeItem("token");
      settoken("");
      navigate("/")
    }
     return (
    <div className='navbar flex flex-wrap justify-between relative top-4 text-gray-500 '>
      <Link to="/"><img src={assets.logo} alt="" className="logo  max-lg:w-15" /></Link>
      <ul className="navbar-menu flex flex-wrap gap-6 h-3 max-lg:gap-2 max-lg:text-sm">
        <Link to='/' onClick={()=>setmenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu'onClick={()=>setmenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download'onClick={()=>setmenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer'onClick={()=>setmenu("contact")} className={menu==="contact"?"active":""}>Contact-Us</a>
      </ul>
      <div className="navbar-right flex flex-wrap gap-8 relative top-1 max-lg:gap-3">
        <img src={assets.search_icon} alt="" className="search w-6 h-6 relative top-2 max-lg:w-4 max-lg:h-4" />
        <div>
           <Link to='/Cart'><img src={assets.basket_icon} alt="" className="dot w-6 h-6 relative top-2 max-lg:w-4 max-lg:h-4" /></Link> 
          {
            gettotalcartamount()>0?<div className="dot1 rounded absolute w-2 h-2 bg-amber-700 top-1 left-20"></div>:<div className="dot1 hidden"></div>
          }
        </div>
        {!token?<button onClick={()=>setshowLogin(true)} className="sign-in h-8 border-1 rounded-3xl border-amber-500 w-20 bg-white hover:bg-amber-100 cursor-pointer transition delay-70 relative top-1 max-lg:w-15 max-lg:h-7">Sign In</button>:
        <div className='navbar-profile flex flex-row'>
          <img src={assets.profile_icon} className='w-6 h-6'/>
          <ul className="nav-profile-dropdown flex flex-row">
            <li onClick={()=>navigate('/myorders')} className='text-sm'><img className='w-5 h-5' src={assets.bag_icon} alt="" />Orders</li>
            <hr />
            <li onClick={logout} className='text-sm'><img className='w-5 h-5'  src={assets.logout_icon} alt="" />Logout</li>
          </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar
