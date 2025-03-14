import React, { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import Loginpopup from './components/LoginPopUp/Loginpopup.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
const App = () => {

  const [showLogin,setshowLogin] = useState(false)

  return (
    
    <>
    {showLogin?<Loginpopup  setshowLogin={setshowLogin}/>:<></>}
    <div className='app'>
      <Navbar setshowLogin= {setshowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
