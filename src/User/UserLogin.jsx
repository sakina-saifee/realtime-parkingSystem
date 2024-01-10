import React, {useEffect, useState} from 'react'
import './UserLoginRegister.css'
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

import {  toast } from 'react-toastify';
// import Navbar2 from '../Navbar2';

const UserLogin = () => {

  const [userdata, setuserdata]=useState({
  email:"",
  password:"",
});
const navigate=useNavigate();

const handlechange=(e)=>{
const {name, value}= e.target;
setuserdata((prevdata)=>({...prevdata,[name]:value}));
}
const handleLogin=(e)=>{
e.preventDefault();

signInWithEmailAndPassword(auth, userdata.email, userdata.password).then((userCredentials)=>{

   toast.success("User Logged in Successfully!");
navigate('/userhome')
setuserdata({
    email:"",
  password:"",
 })
  setTimeout(()=>{
 navigate('/userhome')
  },4000)
}).catch((error)=>{

if(userdata.email=="" || userdata.password==""){
   toast.error("Please Fill The Required Fields!");

}


})



}

  return (
  <>

   {/* <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Parking Lot System</h1>
       </div>
    </div> */}

<div className='background'></div>

   <div className='login-container'>
    <form className='login-form'>
      <p className='header'>Log In</p>

  
     <label>Email</label>
      <input type="text" placeholder='Email here..' value={userdata.email} name="email" onChange={handlechange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' value={userdata.password} name="password" onChange={handlechange}/>
    
    <button onClick={handleLogin}>Log In</button>

    <div className='createNewaccdiv'>
      <span>Create New Account</span>
      <Link to='/userregister' className='signupLabel'>Sign Up</Link>
    </div>
    
    
    </form>
    
    </div>
  </>
  )
}

export default UserLogin