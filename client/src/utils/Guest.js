import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Guest({children}){
    const token=Cookies.get("token")
    const auth=useSelector(state=>state.auth)
    return !auth.isAuthenticated ? children : <Navigate to="/" replace={true}/>
}