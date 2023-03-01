import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../store/auth'
export default function Navbar() {
  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  function _logout(){
    Cookies.remove("token")
    dispatch(logout())
    navigate("/login")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className='Nav-buttons'> Expensor</Link>
          </Typography>
          <Link to='/category' className='Nav-buttons'><Button color="inherit" >Category</Button></Link>
          {isAuthenticated && <Button onClick={_logout}  color="inherit" >Logout</Button>}
          {
             !isAuthenticated 
             &&
              <>
                <Link to='/login' className='Nav-buttons'><Button color="inherit" >Login</Button></Link>
                <Link to='/register' className='Nav-buttons'><Button color="inherit" >Register</Button></Link>
              </>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}