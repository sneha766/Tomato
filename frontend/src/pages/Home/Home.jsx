import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExplorePage from '../../components/ExplorePage/ExplorePage'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'


const Home = () => {
    const[category,setcategory] = useState("All");
  return (
    <div>
      <Header />
      <ExplorePage category={category} setcategory= {setcategory}/> 
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
