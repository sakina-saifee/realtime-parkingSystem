import React from 'react'
import '../Navbar.css'
import Navbar2 from '../Navbar2'
import Footer from '../Footer'
import AboutUs from './AboutUs' 

const UserHome = () => {
  return (
  <>
    <Navbar2/>
  <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Parking Lot System</h1>
       </div>
    </div> 
    
  

    {/* <AboutUs/> */}
    <Footer/>
  
  </>
  )
}

export default UserHome
