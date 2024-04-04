import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {useParams, useNavigate } from "react-router-dom";

const UpdateStudent = () => {
  const [startYear, setStartYear] = useState();
  const [lastYear, setLastYear] = useState();
  const [fees, setFees] = useState();
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const{id} =useParams();

 const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue} = useForm({});

  useEffect(() => {
   getcourse();
   getStudentDetail();
  }, []);



  async function getStudentDetail()
  {
   let result = await fetch(`http://localhost:8000/std/getstudent/${id}`,
   {
     method:"GET",
     headers:{"Content-Type":"application/json"},
   }
   );
    result = await result.json();
      //console.log("====>",result.result.course);
       if(result.status===200)
       {
         setValue("name",result.result.name);
         setValue("email",result.result.email);
         setValue("mobile",result.result.mobile);
         setValue("gender",result.result.gender);
         setValue("address",result.result.address);
         setValue("dob",result.result.dob);
         
      }
     //console.log(result);
    } 
  

  const stdSubmit = async (value) => {
    // console.log("----std",value);
   
    try {
     let result = await fetch(`http://localhost:8000/std/updatestudent/${id}`,{
        method:"PATCH",
        body:JSON.stringify({value}),
        headers:{"Content-Type":"application/json",} 
    });
       result = await result.json();
      if (result.status === 200) {
      
        setMsg("User Registered Successfully");
        setMsgType("primary");
         Navigate("/studentList");
      } else if (result.status === 400) {
        
        setMsg("Email id alreday exist .try another!");
        setMsgType("danger");
      }
    } catch (errors) {
      setMsg("Something wen't plz check");
    }

  
  };

  async function getcourse() {
    let result = await fetch("http://localhost:8000/std/getcourse");
    if (result.status === 200) {
      result = await result.json();
      setData(result);
    } else {
      //alert("something went wrong");
    }
  }

  const handleYear = (e) => {
    let totalYear = Number(e.target.selectedOptions[0].getAttribute("year"));
    let totalFees = Number(e.target.selectedOptions[0].getAttribute("fees"));
    setFees(totalFees);
    console.log("==============",fees);
    let startYear =
      new Date().getFullYear() +
      "-" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date().getDate()).slice(-2);
    let lastYear =
      new Date().getFullYear() +
      totalYear +
      "-" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date().getDate()).slice(-2);

    setStartYear(startYear);
    setLastYear(lastYear);
  };

  return (
    <div className="Container">
      <div>
        {msg && (
          <div className={"alert alert-" + msgType} role="alert">
            {msg}
          </div>
        )}

        <h3>Update Student</h3>
        <form onSubmit={handleSubmit(stdSubmit)}>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className="form-control"
          />
          <br></br>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your Email"
            className="form-control "
          />
          <br></br>

          <input
            type="text"
            {...register("mobile", { required: true })}
            placeholder="Enter your mobile number"
            className="form-control "
          />
          <br></br>

          <input
            type="date"
            {...register("dob", { required: true })}
            placeholder="Enter your date of birth"
            className="form-control "
          />
          <br></br>

          <input
            type="text"
            {...register("address", { required: true })}
            placeholder="Enter your Address"
            className="form-control "
          />
          <br></br>
          <select type="text" {...register("gender", { required: true })}>
            <option type=" radio" value="male" className="form-control">
              {" "}
              Male
            </option>
            <option type="radio" value="Female">
              Female
            </option>
            <option type="radio" value="Other">
              Other
            </option>
          </select>
          <br />
          <select
             className="form-control mt-2"
            {...register("courseId", { required: true })}
            onClick={handleYear}
          >
            <option>select course</option>

            {data.map((course, index) => (
              <option
                key={index}
                value={course._id}
                year={course.durationInYear}
                fees={course.fees}
              >
                {course.branch}
              </option>
            ))}
          </select>
          <div>
            <input type="hidden" value={startYear} {...register("startYear")}/>
            <input type="hidden" value={lastYear} {...register("lastYear")}/>
            <h6>
              from{startYear}
              {""}
              <br />
              {""}To{lastYear}
            </h6>
          </div>
          <br />
          <button type="Submit" className="btn btn-primary">
            {" "}
           update student
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateStudent;
