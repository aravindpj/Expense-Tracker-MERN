import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { IconButton, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/auth';
import ClearIcon from '@mui/icons-material/Clear';

export default function BasicTextFields({editCategory,setEditcategory}) {
    const token=Cookies.get("token")
    const user=useSelector(state=>state.auth.user)
    const dispatch = useDispatch()
    let options=['User']
    let initialState={
        icon:options[0],
        label:""
    }
    const [form,setForm]=React.useState(initialState)
    function reLoadData(_user){
        setForm(initialState)
        editCategory._id !== undefined && setEditcategory({})
        dispatch(setUser({user:_user}))
    }
    function resetForm(){
        setForm(initialState)
        setEditcategory({})
     }
    function handleSubmit(e){
        e.preventDefault()
        console.log(form);
        editCategory._id === undefined ? create() : update(editCategory._id)
    }
    async function create(){
        const response=await fetch(`http://localhost:4000/categories`,{
            method:"POST",
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(form)
        })
        if(response.ok){
            const {data}=await response.json()
            const {categories}=data
            console.log(categories);
            const _user={
                ...user,
                categories:[...categories]
            }
            reLoadData(_user);
        }
    }
    
    async function update(id){
        const response=await fetch(`http://localhost:4000/categories/${id}`,{
            method:"PATCH",
            body:JSON.stringify(form),
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if(response.ok){
            const {data}=await response.json()
            const {categories}=data
            const _user={
                ...user,
                categories
            }
            
           reLoadData(_user)
        }
    }

    React.useEffect(()=>{
       setForm(editCategory)
    },[editCategory])
  return (
    <Card sx={{ minWidth: 275 , marginTop:5, marginBottom:4}}>
         <CardContent>
            <Typography variant="h6" sx={{marginLeft:1,color:"#3f51b5"}}>
                Create categories
            </Typography> 
            <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{display:"flex" , gap:3,padding:1}}
            onSubmit={handleSubmit}
            >
            <TextField id="outlined-basic" size='small' name='label' value={form.label}
             onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})} label="category" 
             variant="outlined" />
            <Autocomplete
                value={form.icon}
                onChange={(event, newValue) => {
                setForm({...form,icon:newValue});
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField  {...params} size='small' label="Select icon" />}
            />
            {
              editCategory._id !== undefined ?
              <>
                <Button type='submit'  variant="contained" >Update</Button>
                <IconButton color='error' onClick={()=>resetForm()}><ClearIcon/></IconButton>
              </> 
              : <Button type='submit'  variant="contained" >Submit</Button>
            }
            </Box>
        </CardContent>
    </Card>
  );
}