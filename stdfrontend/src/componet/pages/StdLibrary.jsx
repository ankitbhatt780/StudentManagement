import React from "react";
import Typography from "@mui/material/Typography";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
const StdLibrary = () => {
  const student = JSON.parse(Cookie.get("std"));
  const navigate = useNavigate();
  console.log(student);
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
                </tbody>
              </table>
            </div>
            <div>
              <div id="ctl00_ContentPlaceHolder1_divimage">
                <img
                  id="imgMemberPhoto"
                  src="https://portal.aksuniversity.com/Images/logo.png"
                  style={{
                    borderColor: "aqua",
                    width: "2px",
                    borderStyle: "groove",
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
          <input
            type="submit"
            value="Go to Home"
            onClick={() => navigate("/home")}
          />
        </div>
      </center>
    </>
  );
};

export default StdLibrary;
