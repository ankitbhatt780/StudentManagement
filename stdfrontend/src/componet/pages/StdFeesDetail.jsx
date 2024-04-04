import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Cookie from "js-cookie";
import { red } from "@mui/material/colors";
import { Box, Button, Input, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

const StdFee = () => {
  const student = JSON.parse(Cookie.get("std"));
  const [open, setOpen] = React.useState(false);
  const [fees, setFees] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const stdId = student._id;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getStdById();
  }, []);

  const getStdById = async () => {
    let result = await fetch(`http://localhost:8000/std/getStdById/${stdId}`, {
      method: "GET",
    });

    result = await result.json();
    setFees(result.fees);
  };

  const onSubmit = async (value) => {
    const { fees } = value;

    try {
      let res = await fetch("http://localhost:8000/fees/fees", {
        method: "POST",
        body: JSON.stringify({ fees, stdId }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.status === 200) {
        res = await res.json();
        reset();
        setOpen(false);
      }
    } catch (error) {}
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
          <hr />
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Fees Status: </span>
                </td>
                <td>
                  <span style={{ color: "red" }}>
                    <b>NOT CLEAR</b>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                    class="FieldName"
                  >
                    Total Amount Due:{" "}
                  </span>
                </td>

                <td>
                  <span>
                    <b>{student.fees - fees.fees + ".00"}</b>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    id="ctl00_ContentPlaceHolder1_lblStudentMobile"
                    class="FieldName"
                  >
                    Paid Amount :{" "}
                  </span>
                </td>
                <td>
                  <span>
                    <b> {fees.fees + ".00"} </b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="pyment">
            <div
              style={{
                width: "100%",
                margin: "90px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <input
                type="submit"
                name="ctl00$ContentPlaceHolder1$btnPayOnline"
                value="Pay Online"
                onClick={handleOpen}
              />
              <input type="submit" value="Pay at Bank" onClick={handleOpen} />
              <input
                type="submit"
                value="Go to Home"
                onClick={() => navigate("/home")}
              />
            </div>
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <center>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      type="Number"
                      placeholder="Enter your Fees"
                      style={{ marginBottom: "30px" }}
                      {...register("fees")}
                    />
                    <br />
                    <Button type="submit"> Submit</Button>
                  </form>
                </center>
              </Typography>
            </Box>
          </Modal>
        </div>
      </center>
    </>
  );
};

export default StdFee;
