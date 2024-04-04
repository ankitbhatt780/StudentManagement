//import { colors } from '@mui/material';
import React, { useState} from 'react'
import {useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const[msg,setMsg] = useState('');
  const[type,setType]= useState('');
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors},reset} = useForm();

  // let imageStyle ={height:"600px",
  // backgroundImage:`url
  // (https://pngtree.com/freebackground/modern-double-color-futuristic-neon-background_1181573.html )`}>
  

  async function onSubmit(value)
  {
    let result = await  fetch("http://localhost:8000/course/addcourse",{
      method:'POST',
      body:JSON.stringify(value),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
  });
   if(result.status===200)
   {
    navigate('/CourseList')
     setType('success');
    setMsg('Successfully/json')
    reset();
   }
  else{
    setType('danger');
    setMsg('something went wrong')    
  }
 setTimeout(function()
 { 
    setType('');
    setMsg('');
 } ,10000);
  }
 
  return (
   // <div class="image" style={imageStyle}>
    <div className='Container'>
       {
        msg===''?
        <h3>Add Course</h3>
        :
        <div className={"alert alert-"+type} role='alert'>{msg}</div>
      } 
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' className='form-control' placeholder='Enter  your Course' 
        {...register('course',{required:true})}/>
      
        <input type='text'  className='form-control' placeholder='Enter branch' 
        {...register('branch',{required:true})}/>

       <input type='number' className='form-control' placeholder='Enter durationInYear' 
        {...register('durationInYear',{required:true})}/>

       <input type='number' className='form-control' placeholder='Enter fees' 
        {...register('fees',{required:true})}/>
        {/*<subject/>*/}
        <input type='text'className='form-control' placeholder='Enter your first subject'{...register('subject1',{required:true})}/>
        <input type='text' className='form-control' placeholder='Enter your second '
        {...register('subject2',{required:true})}/>

        <input type='text'  className='form-control'placeholder='Enter your third subject' 
         {...register('subject3',{required:true})}/>

        <button type='submit'  className='btn btn-primary'>Add Course</button>
      </form>
    </div>
    // </div>
  )
}

export default AddCourse;