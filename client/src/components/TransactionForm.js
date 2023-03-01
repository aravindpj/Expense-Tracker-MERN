import  React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Cookie from 'js-cookie'
import { Box } from '@mui/system';
import {useSelector} from 'react-redux'
export default function TransactionForm({fetchAlltransaction,editTransaction,setEditTransaction}) {
    const token=Cookie.get('token')
    const {categories}=useSelector(state=>state.auth.user)
  
    let initial={
        amount:"",
        description:"",
        date:null,
        category_id:""
     }
   
    const [form,setForm]=useState(initial)
    function handleChange(e){
       setForm({...form,[e.target.name]:e.target.value})
    }
    function handleDate(newValue){
        setForm({...form,date:newValue})
   } 
   
   function reRender(){
      setForm({...initial})
      fetchAlltransaction()
      editTransaction.amount !== undefined && setEditTransaction({})
   }

  async function update(id){
    const response=await fetch(`http://localhost:4000/transaction/${id}`,{
      method:"PATCH",
      headers:{
         "content-type":"application/json",
         Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(form)
   })
    if(response.ok){
      reRender()
    }
   }
  
   async function create(){
    const response=await fetch('http://localhost:4000/transaction',{
       method:"POST",
       headers:{
          "content-type":"application/json",
           Authorization: `Bearer ${token}`
       },
       body:JSON.stringify(form)
    })
    if(response.ok){
      reRender()

     }
   }

   async function submitForm(e){
    e.preventDefault()
    editTransaction.amount !== undefined ? await update(editTransaction._id) : await create()
 
  }
  function getNameById(){
    return categories.find(category=>category._id==form.category_id)
  }
  useEffect(()=>{
    setForm(editTransaction)
  },[editTransaction])
  return (
    <Card sx={{ minWidth: 275 , marginTop:10}}>
      <CardContent>
      <Typography variant="h6" sx={{marginLeft:1, marginBottom:1}}>
           Add new transaction
        </Typography>
        <Box component="form" onSubmit={submitForm} sx={{display:"flex"}}>
        <TextField 
            id="outlined-basic" sx={{marginRight:3}} 
            label="Amount" size="small" 
            variant="outlined"
            name="amount" 
            value={form.amount}
            onChange={handleChange}
        />
        <TextField 
            id="outlined-basic" 
            sx={{marginRight:3}} 
            label="Description" 
            name="description"
            size="small" 
            variant="outlined" 
            value={form.description}
            onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Transaction date"
          inputFormat="MM/DD/YYYY"
          value={form.date}
          onChange={handleDate}
          renderInput={(params) => <TextField {...params} size="small" sx={{marginRight:3}} />}
        />
        </LocalizationProvider>
        <Autocomplete
          value={getNameById()}
          onChange={(event, newValue) => {
            setForm({...form,category_id:newValue._id});
          }}
          id="controllable-states-demo"
          options={categories}
          sx={{ width: 200 , marginRight:3}}
          renderInput={(params) => <TextField {...params} size="small"  label="Category" />}
      />
        {
          editTransaction.amount !== undefined &&
          <>
            <Button type='submit'  variant="contained" >Update</Button>
            <IconButton color='error' onClick={()=>reRender()}><ClearIcon/></IconButton>
          </>
        }
        {
          editTransaction.amount === undefined && <Button type='submit' variant="contained">Submit</Button>
        }
        </Box>
      </CardContent>
    </Card>
    
  );
}