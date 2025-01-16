import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
function Logins() {

   let[Email,setEmail]=useState("");
   let [Password,setPassword]=useState(""); 

  

   function handleSubmite(e){
    e.preventDefault();
    
   let myobj={
    email:Email,
    password:Password
   }
   console.log(myobj)

   axios.post("https://reqres.in/api/login",myobj)
   .then((res)=>{
    let correct=res.data.token;
    console.log(correct);
    let cardToken =localStorage.setItem("token",correct);
   }).catch((err)=>{
    console.log(err);
   })



   }







  return (
    <div>
         <div className='form-container'>
          <h1 style={{textAlign:"center" , paddingTop:"10px"}}>Login</h1>
         <form onSubmit={handleSubmite} style={{padding:"10px"}}>
            <input type="text" placeholder='Enter Your Email' onChange={(e)=>{setEmail(e.target.value)}}  style={{width:"100%", padding:"10px" , marginBottom:"20px" ,marginTop:"30px" ,border:"1px solid black",outline:"none"}} />
            <input type="Password" placeholder='Enter Your Password' onChange={(e)=>{setPassword(e.target.value)}}  style={{width:"100%", padding:"10px" , marginBottom:"20px" ,border:"1px solid black",outline:"none"}} />
            <input type="submit" style={{ padding:"10px" , marginBottom:"20px" ,marginLeft:"40%" , cursor:"pointer"}}  />
         </form>
         </div>
    </div>
  )
}

export default Logins
