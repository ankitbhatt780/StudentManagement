import React from "react";
import {Button,TextField,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";

const FeesDetail = ( {closeModel,id} ) => { 
  const [std,setStd]= useState([]);
  const [stdFees,setStdFees] = useState([]);
  const [stdId, setStdId] = useState(id);


  const {register,handleSubmit, reset, formState:{ errors },
  } = useForm();

  useEffect(()=>{
    getStdById();
  },[]);

const getStdById = async ()=> {
    let result = await fetch(`http://localhost:8000/std/getstudentdetail/${id}`);
    result = await result.json();
    
    setStd(result.result[0].fees);
    setStdFees(result.fees.fees);
}
  const onSubmit = async (value) => {
    const {fees} = value;
    try {
      let result = await fetch("http://localhost:8000/fees/addfees", {
        method: "POST",
        body: JSON.stringify({fees ,stdId}),
        headers: { "content-type": "application/json" },
      });
      if (result.status===200) {
        result = await result.json();
         reset();
        closeModel();
      }
    } catch (error) {
      console.log(error);
    }
 };

  return (
    <>
    
      <div className="feesDetails-wrap" onClick={closeModel}></div>

      <div className="feesDetails-cont ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" style={{ marginBottom: 5 }}> Fees Details</Typography>
         
          <table class="table table-striped">
            <thead class="table-info">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Total Fees</th>
                <th scope="col">Total Paid Fees</th>
                <th scope="col">Pending Fees</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>{std}</td>
                <td>{stdFees}</td>
                <td>{std-stdFees}</td>
               
              </tr>
            </tbody>
          </table>
          <div>
            <TextField
              className="w-50 mb-3"
              style={{ margin: 10 }}
              label="Enter Fees"
              type="number"
              {...register("fees", {
                required: {
                  value: true,
                  message: "Fees is Required",
                },
              })}
              error={!!errors.addFees}
              helperText={errors?.addFees?.message}
            />
            <div>
              <Button variant="contained" color="error" onClick={closeModel}>
                Cancel</Button> {""}
              <Button variant="contained" color="success" type="submit">
                Submit
              </Button>
            </div>
          </div>
       </form >
      </div>
    </>
  );
};
export default FeesDetail;