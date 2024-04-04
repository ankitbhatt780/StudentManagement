import React, { useEffect, useState} from 'react'
import {useForm } from "react-hook-form";
import {useParams,useNavigate} from "react-router-dom";

function UpdateCourse(){
   const[msg,setMsg] = useState('');
   const[type,setType]= useState('');
   const{id} =useParams();
   //const{params}  = useParams();

   const Navigate = useNavigate();

const {register,handleSubmit,formState:{errors},reset,setValue} = useForm();
    useEffect(()=>{
    //console.log("test",id)
    getCourseDetail();
  },[])

   const gotoHome=()=>
   {
    Navigate('/CourseList');
   }
   async function getCourseDetail()
   {
    let result = await fetch(`http://localhost:8000/course/getcourse/${id}`,
    {
      method:"GET",
      headers:{"Content-Type":"application/json"},
    }
    );
     result = await result.json();
       //console.log("====>",result.result.course);
        if(result.status===200)
        {
          setValue("course",result.result.course);
          setValue("branch",result.result.branch);
          setValue("durationInYear",result.result.durationInYear);
          setValue("fees",result.result.fees);
          setValue("subject1",result.result.subject1);
          setValue("subject2",result.result.subject2);
          setValue("subject3",result.result.subject3);
       }
      //console.log(result);
     } 
   



  async function onSubmit(value)
  {
    console.log("val",value);
    let result = await fetch(`http://localhost:8000/course/updatecourse/${id}`,{
      method:"PATCH",
      body:JSON.stringify({value}),
      headers:{"Content-Type":"application/json",} 
  });
     result = await result.json();
     console.log("result",result);
   if(result.status===200)
   {
     Navigate('/CourseList')
     setType('success');
    setMsg('Successfully/json')
    reset()
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
    <div className='Container'>
       {
        msg===''?
        <h3>Update Course</h3>
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
        <input type='text'className='form-control'
         placeholder='Enter your first subject'
         {...register('subject1',{required:true})}/>
        <input type='text' className='form-control'
        placeholder='Enter your second subject'  {...register('subject2',{required:true})}/>
        <input type='text'  className='form-control'placeholder='Enter your third subject' 
         {...register('subject3',{required:true})}/>

        <button type='submit'  className='btn btn-primary'>UpdateCourse</button>
      </form>
    </div>
  )
}
export default UpdateCourse;

