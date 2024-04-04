import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Multiselect from "multiselect-react-dropdown";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Avatar,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Teachers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [teacher, setTeacher] = React.useState([]);
  const [techSubject, setTechSubject] = React.useState("");
  React.useEffect(() => {
    courseList();
    subjectList();
    teachersList();
  }, []);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({});
  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };
  const addTeacher = async (values) => {
    // console.log("-->", values);
    const { name, email, password, mobile, gender, address, courseId } = values;
    // console.log("------>", techSubject);
    const result = await fetch("http://localhost:8000/teachers/teacher", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        mobile,
        gender,
        address,
        courseId,
        techSubject,
      }),
      headers: { "content-type": "application/json" },
    });

    handleClose(true);
    console.log(result);
    reset();
    teachersList();
  };
  const teachersList = async () => {
    let result = await fetch("http://localhost:8000/teachers/teacher", {
      method: "GET",
    });
    result = await result.json();
    setTeacher(result);
    console.log("teacher", result);
  };
  //Multipal Select Value
  const subjectList = async () => {
    const getSubjectName = [];
    let result = await fetch("http://localhost:8000/sub/newSubject", {
      method: "GET",
    });
    result = await result.json();

    for (let i = 0; i < result.length; i++) {
      getSubjectName.push(result[i].subject);
    }

    setSubject(getSubjectName);
  };

  const courseList = async () => {
    let result = await fetch("http://localhost:8000/course/course", {
      method: "GET",
    });
    result = await result.json();
    setData(result);
  };
  // console.log(data);
  const deleteTeacher = async (id) => {
    console.log(id);
    let result = await fetch(
      `http://localhost:8000/teachers/deleteteacher/${id}`,
      { method: "DELETE" }
    );
    teachersList();
  };
  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "skyblue",
            height: "30px",
            width: "90%",
            display: "flex",
            justifyContent: "space-around",
            position: "absolute",
          }}
        >
          <Button onClick={handleOpen}>New Teachers</Button>
          <Button>Teachers List</Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <center>
              <b>ADD TEACHER</b>
            </center>
            <form onSubmit={handleSubmit(addTeacher)}>
              <div className="App">
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
              </div>
              <Card
                sx={{
                  height: "40px",
                  backgroundColor: "lightblue",
                  padding: "2px",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                Select Course
                <select className="form-control mt-2" {...register("courseId")}>
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
              </Card>
              <Multiselect
                isObject={false}
                options={subject}
                showCheckbox
                onRemove={(event) => {
                  console.log(event);
                }}
                onSelect={(event) => {
                  // console.log("trest", event.toString());
                  setTechSubject(event.toString());
                }}
              />
              <TextField
                style={{
                  width: "200px",
                  marginRight: "130px",
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
              />{" "}
              <TextField
                style={{ width: "200px" }}
                type="email"
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
                  width: "200px",
                  marginRight: "130px",
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
                  width: "200px",
                  marginBottom: "20px",
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
              <br />
              <center>
                <Button type="submit" variant="outlined">
                  Save ➣
                </Button>
              </center>
            </form>
          </Box>
        </Modal>
      </div>
      <center>
        <div style={{ marginTop: "40px" }}>
          <Card
            component={Paper}
            style={{
              backgroundColor: "lightblue",
              width: "1000px",
              border: "solid",
              marginBottom: "20px",
              // boxShadow: "2px 2px 10px 1px #37bfd4",
            }}
          >
            <Table sx={{ minWidth: "650px" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">SN.</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Mobile</TableCell>

                  <TableCell align="right">Subjects</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor: "white" }}>
                {teacher.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="right">{index + 1 + "."}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">{row.mobile}</TableCell>
                    <TableCell align="right">{row.techSubject},</TableCell>
                    <TableCell align="right">
                      <DeleteIcon onClick={() => deleteTeacher(row._id)} />
                      <Tooltip title="Delete">
                        {/* <IconButton>
                          <DeleteIcon  />
                        </IconButton> */}
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </center>
    </>
  );
}
