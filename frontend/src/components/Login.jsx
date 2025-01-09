import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("hello");
    try {
      const {data} = await axios.post('/user/login', {
        email, 
        password
      }, {
        withCredentials : true,
        headers: {
          "Content-Type" : "application/json"
        }
      });
      console.log(data);
      toast.success(data.message || "user loggedin successfuly");
      localStorage.setItem("jwt", data.user.token);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors);      
   }

  }

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='bg-zinc-800  px-6 md:px-14 py-5 rounded-lg flex gap-5  flex-col'>
        <div><h2 className='text-center text-2xl md:text-4xl'>Login</h2></div>
        <form   
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col  gap-5 mt-10'>
         
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-md font-bold'>Email</label>
            <input type="text" id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-transparent border-[1px] text-sm px-3 py-2 mt-2 rounded-md outline-none' 
            placeholder='Enter your email' />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password" className='text-md font-bold'>password</label>
            <input type="password" id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-transparent border-[1px] text-sm  px-3 py-2 mt-2 rounded-md outline-none' 
            placeholder='Enter your password' />
          </div>

          <button type='submit' className='bg-blue-500 py-2 rounded-lg'>Login</button>
          <p className='text-center'>New User ? <Link to="/signup" className='text-blue-400 capitalize'>Signup</Link>  </p>
        </form>
      </div>

    </div>
  )
}

export default Login