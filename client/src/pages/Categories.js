import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import dayjs from 'dayjs'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/system';
import {setUser} from '../store/auth'
import CategoryForm from '../components/categoryForm'
export default function  CategoriesForm() {
  const user=useSelector(state=>state.auth.user)
  const [editCategory,setEditcategory]=React.useState({})
  const token=Cookies.get('token')
  const dispatch=useDispatch()
  async function handleDelete(id){
    const response=await fetch(`http://localhost:4000/categories/${id}`,{
        method:"DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(response.ok){
        const _user = {
            ...user,
            categories: user.categories.filter((cat) => cat._id != id),
          };
          dispatch(setUser({ user: _user }));
    }
  }

  return (
    <Container>
    <CategoryForm editCategory={editCategory} setEditcategory={setEditcategory}/>
    <TableContainer sx={{ marginTop:4}} component={Paper}>
      <Typography variant="h6" sx={{marginLeft:3, marginBottom:1 ,color:"#3f51b5"}}>
         List of Categories  
      </Typography>  
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" >Label</TableCell>
            <TableCell align="right" >Icon</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.categories?.map((row) => (
            <TableRow
              key={row.label}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='left'>
                {row.label}
              </TableCell>
              <TableCell align="right">{row.icon}</TableCell>
              <TableCell align='center'>
                    <IconButton  sx={{marginRight:1}} onClick={()=>setEditcategory(row)} color='primary'><EditIcon/></IconButton>
                    <IconButton color='warning' onClick={()=>handleDelete(row._id)} ><DeleteIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

