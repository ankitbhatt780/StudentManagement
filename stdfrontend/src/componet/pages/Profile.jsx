import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Cookie from "js-cookie";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const student = JSON.parse(Cookie.get("std"));
  const [open, setOpen] = React.useState(false);
  const [fees, setFees] = useState([]);
  const [result, setResult] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState("");
  const [msgType, setMsgType] = useState("");

  const navigate = useNavigate();
  const stdId = student._id;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    getStdById();
  }, []);
  const onSubmit = async (values) => {
    const { name, mobile, dob, gender, address } = values;
    console.log("-------->", values);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("stdId", stdId);
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("gender", gender);

    console.log("====>", formData);
    reset();
    //     try {
    //       let result = await fetch("http://localhost:5000/updateStd", {
    //         method: "POST",
    //         body: formData,
    //         // headers: { "content-type": "application/json" },
    //       });
    //       if (result.status == 200) {
    //         result = await result.json();
    //         setMsg("Wating For Admin Aprovel....!");
    //         setMsgType("primary");
    //         reset();
    //       } else {
    //         setMsg("something wen't wrong plz check it");
    //         setMsgType("danger");
    //       }
    //       setTimeout(function () {
    //         setMsg("");
    //         setMsgType("");
    //       }, 5000);
    //     } catch (error) {
    //       setMsg("something wen't wrong plz check it");
    //       setMsgType("danger");
    //     }
  };
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  const getStdById = async () => {
    let result = await fetch(`http://localhost:8000/std/getStdById/${stdId}`, {
      method: "GET",
    });

    result = await result.json();
    setFees(result.fees);
    setResult(result.result[0].course);
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", marginLeft: "30px" }}>
        <img src="https://portal.aksuniversity.com/Images/logo.png" />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: {
              xs: "none",
              sm: "block",
              marginLeft: "30px",
            },
          }}
        >
          <div
            style={{
              fontSize: "30px",
              fontcolor: "block",
              marginTop: "10px",
            }}
          >
            AKS UNIVERSITY, SATNA
          </div>

          <div>The University with Difference</div>
        </Typography>
      </div>
      <center>
        <div className="Attendance">
          <div className="AttendanceHead"> STUDENT LIHBRARY REPORT CARD</div>
          <div className="Head">
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentName"
                        class="FieldName"
                      >
                        Member Name:{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b>{student.name}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblCourse"
                        class="FieldName"
                      >
                        Admission Year:{" "}
                      </span>
                    </td>
                    <td>
                      <span id="ctl00_ContentPlaceHolder1_Course">
                        <b> {student.startYear}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblOrganization"
                        class="FieldName"
                      >
                        Email:{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b>{student.email}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                        class="FieldName"
                      >
                        Contact Number:{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b>{student.mobile}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                        class="FieldName"
                      >
                        Total Amount :{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b>{student.fees + ".00"}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                        class="FieldName"
                      >
                        Course :{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b>{result.course}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                        class="FieldName"
                      >
                        Branch :{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b>{result.branch}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                        class="FieldName"
                      >
                        Subjects :{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b>
                          {result.subject1},{result.subject2},{result.subject3},
                          {result.subject4}
                        </b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                        class="FieldName"
                      >
                        Gender :{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b> {student.gender}</b>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                        class="FieldName"
                      >
                        Addmission Year :{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        <b> {student.startYear}</b>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div id="ctl00_ContentPlaceHolder1_divimage">
                <img
                  id="imgMemberPhoto"
                  src="https://portal.aksuniversity.com/Images/logo.png"
                  style={{
                    width: "1px",
                    borderStyle: "inset",
                    height: "100px",
                    width: "90px",
                    marginTop: "5px",
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <input type="submit" value="Update Details" onClick={handleOpen} />
            <input
              type="submit"
              value="Go to Home"
              onClick={() => navigate("/home")}
            />
          </div>
        </div>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form
                className="form"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                {msg && (
                  <div className={"alert alert-" + msgType} role="alert">
                    {msg}
                  </div>
                )}
                <div>
                  <div className="row">
                    <div className="col-sm ">
                      <center>
                        <Avatar
                          style={{ width: 50, height: 50 }}
                          className="img1"
                        />
                      </center>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                      ></input>
                      <TextField
                        className="w-100 mb-3"
                        style={{ margin: 10 }}
                        placeholder="Enter Name"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Name is Required",
                          },
                          pattern: {
                            value: /^[a-z ,.'-]+$/i,

                            message: "Invalid Name",
                          },
                        })}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                      />
                      <TextField
                        className="w-100 mb-3"
                        style={{ margin: 10 }}
                        placeholder="Enter Mobile"
                        type="text"
                        {...register("mobile", {
                          required: {
                            value: true,
                            message: "mobile is Required",
                          },
                          pattern: {
                            value:
                              /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            message: "Invalid contact",
                          },
                        })}
                        error={!!errors.mobile}
                        helperText={errors?.mobile?.message}
                      />
                      <FormControl>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          name="gender"
                          render={({ field }) => (
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              {...field}
                              defaultValue="female"
                            >
                              <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                              />
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                              />
                            </RadioGroup>
                          )}
                        />
                      </FormControl>{" "}
                      <TextField
                        className="w-100 mb-3"
                        style={{ margin: 10 }}
                        placeholder="Enter Address"
                        type="text"
                        {...register("address", {
                          required: {
                            value: true,
                            message: "address is Required",
                          },
                        })}
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                      />
                      <TextField
                        className="w-100 mb-3"
                        style={{ margin: 10 }}
                        type="date"
                        {...register("dob", {
                          required: {
                            value: true,
                            message: "DOB is Required",
                          },
                        })}
                        error={!!errors.dob}
                        helperText={errors?.dob?.message}
                      />
                    </div>
                    <center>
                      <Button variant="outlined" type="submit">
                        Update
                      </Button>
                    </center>
                  </div>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      </center>
    </>
  );
};

export default Profile;
