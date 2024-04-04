import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { StudentList } from "./StudentList";

export const Students = () => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (value) => {
    const {
      name,
      email,
      fname,
      mname,
      mobile,
      dob,
      gender,
      address,
      img,
      courseId,
    } = value;
    console.log("text", value);

    const result = await fetch("http://localhost:8000/std", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        fname,
        mname,
        mobile,
        dob,
        gender,
        address,
        img,
        startYear,
        lastYear,
        fees,
        courseId,
      }),
      headers: { "content-type": "application/json" },
    });
    reset();
  };

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    courseList();
  }, []);

  const [file, setFile] = useState(null);
  const [startYear, setStartYear] = useState();
  const [lastYear, setLastYear] = useState();
  const [fees, setFees] = useState();
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    // setShowComponent(true);
  };

  const handleYear = (e) => {
    let totalYear = Number(e.target.selectedOptions[0].getAttribute("year"));
    let totalFees = Number(e.target.selectedOptions[0].getAttribute("fees"));
    setFees(totalFees);
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
  const courseList = async () => {
    let result = await fetch("http://localhost:8000/course/course", {
      method: "GET",
    });
    result = await result.json();
    setData(result);
  };
  console.log(data);

  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "lightblue",
          height: "30px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-around",
          borderRadius: "4px",
        }}
      >
        <Button> New Student ⮛</Button>
        <Button onClick={handleClick}>Student List ➣</Button>
      </div>
      <Card>{showComponent && <StudentList />}</Card>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          // boxShadow: "2px 2px 10px 1px #37bfd4",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex" }}>
            <Card
              sx={{
                maxWidth: "70%",
                backgroundColor: "lightblue",
              }}
            >
              <input
                type="file"
                onChange={handleChange}
                id="upload"
                accept="image/*"
                style={{ display: "none" }}
              />
              <label htmlFor="upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Avatar
                    id="avatar"
                    src={file}
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  />
                </IconButton>
              </label>
              <label htmlFor="avatar" />
              {/* <input
                accept="image/*"
                id="upload-avatar-pic"
                type="file"
                hidden
              />
              <label htmlFor="upload-avatar-pic">
                <IconButton component="span">
                  <Avatar />
                </IconButton>
              </label> */}
              <br />
              <TextField
                style={{
                  width: "300px",
                  marginRight: "20px",
                  marginBottom: "10px",
                }}
                type="text"
                label="Enter_Name"
                variant="standard"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid Name",
                  },
                })}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
              <TextField
                style={{ width: "300px", marginRight: "20px" }}
                type="text"
                label="Enter_Email"
                variant="standard"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  // pattern: {
                  //   value: /^[A-Z]{1}[A-Za-z ]+$/,
                  //   message: "Invalid Email",
                  // },
                })}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <TextField
                style={{
                  width: "300px",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
                type="text"
                label="Enter Father_Name"
                variant="standard"
                {...register("fname", {
                  required: {
                    value: true,
                    message: "Father is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid Name",
                  },
                })}
                error={!!errors.fname}
                helperText={errors?.fname?.message}
              />
              <TextField
                style={{ width: "300px", marginRight: "20px" }}
                type="text"
                label="Enter Mother_Name"
                variant="standard"
                {...register("mname", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid Name",
                  },
                })}
                error={!!errors.mname}
                helperText={errors?.mname?.message}
              />
              <TextField
                style={{
                  width: "300px",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
                type="text"
                label="Enter_Mobile_Number"
                variant="standard"
                {...register("mobile", {
                  required: {
                    value: true,
                    message: "Number is Required",
                  },
                  pattern: {
                    value: /^\+[1-9]{1}[0-9]{3,14}$/,
                    message: "Invalid Number",
                  },
                })}
                error={!!errors.number}
                helperText={errors?.number?.message}
              />

              <TextField
                style={{
                  width: "300px",
                  marginRight: "20px",
                  marginTop: "16px",
                }}
                type="date"
                // label="Enter_Date"
                variant="standard"
                {...register("dob", {
                  required: {
                    value: true,
                    message: "DOB is Required",
                  },
                  pattern: {
                    message: "Invalid DOB",
                  },
                })}
                error={!!errors.date}
                helperText={errors?.date?.message}
              />
              <FormControl>
                <FormLabel id="demo-row-redio-buttons-group-label" />
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-redio-buttons-group-label"
                      {...field}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="male"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                ></Controller>
              </FormControl>
              <TextField
                style={{
                  width: "300px",
                  marginRight: "20px",
                  marginLeft: "50px",
                  marginBottom: "30px",
                }}
                type="text"
                label="Enter Address"
                variant="standard"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Address is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid Name",
                  },
                })}
                error={!!errors.address}
                helperText={errors?.address?.message}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "10px",
                }}
              >
                {/* <Button variant="outlined">Cancle</Button> */}
                <Button type="submit" variant="outlined">
                  Save ➣
                </Button>
              </div>
            </Card>
            <Card
              sx={{
                width: "30%",
                backgroundColor: "lightblue",
                marginLeft: "40px",
              }}
            >
              <select
                style={{
                  width: "100px",
                  height: "30px",
                  marginTop: "10px",
                  borderRadius: "4px",
                  backgroundColor: "lightblue",
                }}
                className="form-control mt-2"
                {...register("courseId")}
                onChange={handleYear}
              >
                <option value="" />
                {data.map((course, index) => (
                  <option
                    value={course._id}
                    key={index}
                    year={course.durationInYear}
                    fees={course.fees}
                  >
                    {course.branch}
                  </option>
                ))}
              </select>
              <div
                style={{
                  marginTop: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4>Start Year ➣ {startYear} </h4>
                <h4>Last Year ➣ {lastYear} </h4>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </>
  );
};
