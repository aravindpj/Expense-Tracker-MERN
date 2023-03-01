import { useState } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function CheckAuth({children}){
    const [state,setState]=useState(false)
    const auth=useSelector(state=>state.auth)
    console.log(auth);
    //  if(auth.isAuthenticated) {
    //     setState(true)
    //  }else{
    //     setState(false)
    //  }
    //  console.log(state);
    // return state ? children : <Navigate to="/login" />
    if(auth.isAuthenticated ){
        return children
    }else{
        return <Navigate to="/login" replace={true}/>
    }
    // return auth.isAuthenticated && children 
    
}