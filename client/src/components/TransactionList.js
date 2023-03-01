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
import { useSelector } from 'react-redux';
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
export default function  TransactionList({data,fetchAlltransaction,setEditTransaction}) {
  const user=useSelector(state=>state.auth.user)
  const token=Cookies.get('token')
    //return date nicely formated
    function date(value){
        return dayjs(value).format('DD MMM, YYYY')
    }
    function getCategory(id){
      const category = user.categories
      .find(category=>category._id === id)
      return category ? category.label : "NA"
    }
     //remove or delete selected transaction data from the table
    async function handleDelete(id){
        if(!window.confirm('Are you sure ?')) return
        const response=await fetch(`http://localhost:4000/transaction/${id}`,{
            method:"DELETE",
            headers:{
              Authorization: `Bearer ${token}`
            }
        })
        if(response.ok){
            // alert('Item removed ') 
            fetchAlltransaction()
        }
    }
  return (
    <TableContainer sx={{ marginTop:4}} component={Paper}>
      <Typography variant="h6" sx={{marginLeft:3, marginBottom:1 ,color:"#3f51b5"}}>
         List of transaction  
      </Typography>  
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" >Description</TableCell>
            <TableCell align="right" >Amount</TableCell>
            <TableCell align="right" >Category</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(month=>{
              return(
              month.transactions.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align='left'>
                    {row.description}
                  </TableCell>
                  <TableCell align="right">{row.amount} ₹</TableCell>
                  <TableCell align="right">{getCategory(row.category_id )}</TableCell>
                  <TableCell align="right">{date(row.date)}</TableCell>
                  <TableCell align='center'>
                        <IconButton  sx={{marginRight:1}} onClick={()=>setEditTransaction(row)} color='primary'><EditIcon/></IconButton>
                        <IconButton color='warning' onClick={()=>handleDelete(row._id)}><DeleteIcon/></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )})
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}