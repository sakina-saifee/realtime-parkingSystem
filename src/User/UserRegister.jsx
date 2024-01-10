import React, {useEffect, useState} from 'react'
import './UserLoginRegister.css'
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import {  toast } from 'react-toastify';


const UserRegister = () => {

const [userdata, setuserdata]=useState({
  email:"",
  password:"",
  username:"",
});
const navigate=useNavigate();


const handleChange=(e)=>{
 const {name, value}=e.target;
 setuserdata((prevdata)=>
 ({
  ...prevdata ,
  [name]:value,
 }))

console.log(userdata)
}

const handleSubmit=(e)=>{

e.preventDefault();

createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
  .then((userCredentials)=>{
    const user=userCredentials.user;
  
set(ref(db, 'UserRegister/' + user.uid), {
  Username: userdata?.username,
  Email: userdata?.email,
  Password:userdata?.password,
  uid: user?.uid,
})
.then(() => {
   toast.success("New User Added Successfully!");
   setuserdata({
       email:"",
  password:"",
  username:"",
  }
      );
    

     setTimeout(()=>{
          navigate('/userlogin'); 
     },1000);
}).catch((error)=>{
  toast.error("Error", error);
})


  }).catch((error)=>{
    toast.error("Error", error);
  })


}


  return (
    <>
{/* 
    <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Welcome to Campus Recuirtement!</h1>
       </div>
    </div> */}

{/* <Navbar2/> */}
<div className='background'></div>

     <div className='signup-container'>
    <form className='signup-form'>
      <p className='header'>Create Account</p>

      <label>Your Name</label>
      <input type="text" placeholder='First and Last name here..' name="username" value={userdata.username} onChange={handleChange}/>
    

     <label>Email</label>
      <input type="text" placeholder='Email here..' name="email"  value={userdata.email} onChange={handleChange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' name="password" value={userdata.password} onChange={handleChange}/>
    
    <button onClick={handleSubmit}>Sign Up</button>

    <div className='alreadyhaveaccdiv'>
      <span>Already Have an Account?</span>
      <Link to='/userlogin' className='loginLabel'>Log In</Link>
    </div>
    
    
    </form>
    
    </div>
    </>
   
  )
}

export default UserRegister