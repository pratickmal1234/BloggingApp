import { useState } from "react"
import axios from "axios"
import {Link} from 'react-router-dom'




export function Register(){
     const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try {
      const da={
        name:name,
        email:email,
        password:password
      }
       const response=await axios.post("http://localhost:8003/user/register",da,{
        headers:{"Content-type":"application/json"},
      });
    //  const data=await response.jsno();

      if( response.status===201){
        
        alert(response.data.message);
        
        // navigate("/home");
        
      }
        
    } catch (error) {
        alert(
        error.response?.data?.message||error.message
      );
    }
  }
    return (
    <>
     <div className="register">
      <h1>Register here</h1>
      <form onSubmit={handlesubmit}>
        <div className="input"><strong>Name</strong> <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required placeholder='Enter name here'/></div>
         <div className="input"><strong>Email</strong> <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required placeholder='Enter email here'/></div>
          <div className="input"><strong>Password</strong> <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required placeholder='Enter password here'/></div>
          <div className="input"><button type='submit'>Submit</button></div>
          <div><p>Login here <Link to="/login">Login</Link></p></div>


      </form>
     </div>
    </>
  )

}