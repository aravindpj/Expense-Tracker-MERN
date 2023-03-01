import './App.css';
import React,{useEffect, useState} from 'react'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/auth';
function App() {  
  const token=Cookies.get("token")
  const dispatch=useDispatch()
  async function fetchUser(){
    if(!token) return 
    console.log(token);
    const response=await fetch(`http://localhost:4000/user`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
 
    if(response.ok){
      const user=await response.json()
      console.log(user);
      dispatch(setUser(user))
    }
  }
  useEffect(()=>{
      fetchUser()
  },[])
  return (
    <div className="App">
      <Navbar/>
      <Outlet/>
    </div>
  );
}

export default App;
