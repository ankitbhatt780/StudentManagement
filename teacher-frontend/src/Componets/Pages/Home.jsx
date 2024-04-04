import React, { useState } from "react";
import Header from "../Headers/Header";
import Cookie from "js-cookie";
import Profile from "./profile";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import { Avatar, IconButton, Toolbar, Typography } from "@mui/material";

const Home = () => {
  const teachers = JSON.parse(Cookie.get("teachers"));
  const [teacherId, setTeacherId] = useState(teachers._id);
  const [students, setStudents] = useState([]);
  const [courseId, setCourseId] = useState(teachers.courseId);

  const join = teachers.createdAt.slice(0, 10);

  const getStudentByCouse = async () => {
    let result = await fetch(
      `http://localhost:8000/teachers/getstudentBycourse/${courseId}`,
      {
        method: "GET",
      }
    );
    result = await result.json();
    setStudents(result);
  };
  React.useEffect(() => {
    getStudentByCouse();
  }, []);
  return (
    <>
      <Toolbar sx={{ backgroundColor: "lightblue" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <img src="https://portal.aksuniversity.com/Images/logo.png" />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: {
              xs: "none",
              sm: "block",
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
      </Toolbar>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          height: "35px",
          backgroundColor: "whitesmoke",
          margin: "5px",
          borderRadius: "5px",
          padding: "2px",
        }}
      >
        <b> WellCome : {teachers.name} </b> || <b>Join Date : {join}</b>
      </div>

      <div>
        <Profile />
      </div>
    </>
  );
};

export default Home;
