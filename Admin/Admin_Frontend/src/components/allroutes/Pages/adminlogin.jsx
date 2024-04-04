import { useForm } from "react-hook-form";
import { TextField ,Button} from "@mui/material";
import {useNavigate } from "react-router-dom";
import Cookie from "js-cookie";


export default function AdminLogin()
 {
  const { register, handleSubmit,  formState: { errors } }
   = useForm();
  const navigate = useNavigate();
  const onSubmit = async(data) => 
  {
    try
    {
      let  result = await fetch("http://localhost:8000/admin/login", {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          'content-type':'application/json'
        }
      })
      if(result.status===200)
      {
        result = await result.json();
        Cookie.set('token',result.token,{path:'/'})
        Cookie.set('user',JSON.stringify(result.admin),{path:'/'})
        navigate('/home')
      }
      else 
      {
         console.log('something went wrong');
      }
    }
    catch(err)
    {
        console.log("error");  
    }
    console.log(data);
  }
  return (
    <div style={{backgroundImage:'url("https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=1380&t=st= 1696662258~exp=1696662858~hmac=fda019f6f63b265a73155cfe189264a63246c2771cb405f57defb5084cc87c47")',
    height:"600px"}}>
      <div style={{margin:40,padding:1}}>
        <center>
    <form onSubmit={handleSubmit(onSubmit)}
     style={{margin:150,  height:300, width:400
       ,backgroundColor:"pink"
     }} >
      
    <h4> Login Page</h4>
     <TextField
              className="w-35 mb-2"
              style={{ margin: 5}}
              label="Enter your email"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is Required",
                },
              })}
              error={!!errors.addEmail}
              helperText={errors?.addEmail?.message}
            />
             <br/>
        <TextField
              className="w-35 mb-2"
              style={{ margin: 10 }}
              label="Enter your Password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is Required",
                },
              })}
              error={!!errors.addPassword}
              helperText={errors?.addPassword?.message}
            /> 
            <br/> 
            <br/>   
             <Button variant="contained" color="success" type="submit">
                Submit
              </Button>    
        </form>
        </center> 
        </div>
        </div>       
  );
}