import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartitem,setcartitem] = useState({})
    const [token,settoken] = useState("")
    const [food_list,setfoodlist] = useState([])
    const url = "http://localhost:4000/"
    const addtocart = async (itemId)=>{
       if(!cartitem[itemId]){
        setcartitem((prev)=>({...prev,[itemId]:1}))
       }
       else{
        setcartitem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
       }
       if(token){
        await axios.post(url + "api/cart/add",{itemId},{headers:{token}})
       }
    }
    const removetocart = async (itemId)=>{
        setcartitem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url + "api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const gettotalcartamount = ()=>{
        let total = 0;
        for(const c in cartitem){
            if(cartitem[c]>0){
                let iteminfo = food_list.find((product)=>product._id === c)
                total += iteminfo.price*cartitem[c]
            }
        }
        return total;
    }

    const fetchFoodlist = async ()=>{
        const response = await axios.get(url+"api/food/list")
        setfoodlist(response.data.data)
    }

    const loadcartdata = async (token)=>{
        const response = await axios.post(url + "api/cart/get",{},{headers:{token}})
        setcartitem(response.data.cartData);
    }
    useEffect(()=>{
        async function loaddata() {
            await fetchFoodlist();
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"));
                await loadcartdata(localStorage.getItem("token"))
            }
        }
        loaddata();
    },[])
    const contextValue = {
        food_list,cartitem,setcartitem,addtocart,removetocart,gettotalcartamount,url,settoken,token
    };

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    );
};

export default StoreContextProvider;
