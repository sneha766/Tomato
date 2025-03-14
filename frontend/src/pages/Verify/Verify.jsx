import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';

const Verify = () => {

    const [searchparams,setsearvhparams] = useSearchParams();
    const success = searchparams.get("success");
    const orderId = searchparams.get("orderId");
    const {url} = useContext(Storecontext)
    const navigate = useNavigate();

    const verifypayment = async (req, res) => {
        try {
            console.log("Verifying payment...");
            const response = await axios.post(url + "api/order/verify", { success, orderId });
    
            console.log("API Response:", response.data); // ✅ Log the response
    
            if (response.data.success) {
                console.log("✅ Payment Verified, Redirecting to My Orders...");
                navigate("/myorders");
            } else {
                console.log("❌ Payment Verification Failed, Redirecting to Home...");
                navigate("/");
            }
        } catch (error) {
            console.error("Error in verifypayment:", error);
            navigate("/"); // Redirect to home on error
        }
    };
    
    useEffect(()=>{
        verifypayment();
    },[])


  return (
    <div className='verify'>
      <div className="spinner"></div>
      
    </div>
  )
}

export default Verify
