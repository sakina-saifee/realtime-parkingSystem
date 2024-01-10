import React, {useEffect, useState} from 'react'
import '../User/UserLoginRegister.css'; 
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {  toast } from 'react-toastify';
import Navbar2 from '../Navbar2';

const AdminLogin = () => {

  const [admindata, setadmindata]=useState({
  email:"",
  password:"",
});
const navigate=useNavigate();

const handlechange=(e)=>{
const {name, value}= e.target;
setadmindata((prevdata)=>({...prevdata,[name]:value}));
}
const handleLogin=(e)=>{
e.preventDefault();



if(admindata.email=="admin12@gmail.com" && admindata.password=="1234567"){
    toast.success("User Logged in Successfully!");
    navigate('/adminmain')
    setadmindata({
        email:"",
      password:"",
     })
   
}else if(admindata.email=="" || admindata.password==""){
    toast.error("Please Fill The Required Fields!");
}else{
    toast.error("Invalid Email or Password");
}


}


  return (
  <>

<div className='background'></div>

   <div className='login-container'>
    <form className='login-form admin-login-form'>
      <p className='header'>Administration</p>

  
     <label>Email</label>
      <input type="text" placeholder='Email here..' value={admindata.email} name="email" onChange={handlechange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' value={admindata.password} name="password" onChange={handlechange}/>
    
    <button onClick={handleLogin}>Log In</button>


    
    
    </form>
    
    </div>
  </>
  )

}
export default AdminLogin