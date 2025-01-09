import React, { useEffect, useState } from 'react'
import Home from './components/Home'

import Login from './components/Login'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './components/Signup'
import PageNotFound from './components/PageNotFound'
import  { Toaster } from 'react-hot-toast';

const App = () => {
  const token = localStorage.getItem("jwt");
  const navigateTo = useNavigate();

  return (
    <div className='bg-zinc-900  text-white  h-screen overflow-x-hidden'>

      {/* {todos.map((item, index) =>
         (<h1 key={item._id}>{item.text}</h1>)
      )} */}

      <Routes>
        <Route path="/" element={token ? < Home /> : <Navigate to={"/login"} /> }/>
        <Route path="/login" element={< Login />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />     
    </div>
  )
}

export default App