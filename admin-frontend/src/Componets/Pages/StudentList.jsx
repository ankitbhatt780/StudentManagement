import {
  Avatar,
  Box,
  Button,
  Card,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Model11 from "./studentModal";
import StudentDetails from "./studentModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const StudentList = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClosee = () => setOpen(false);
  const [id, setId] = useState("");

  const [openModel, setopenModel] = useState(false);

  const handleOpenModel = () => setopenModel(true);
  const handleCloseModel = () => setopenModel(false);
  React.useEffect(() => {
    courseList();
  }, []);
  console.log(data);
  const courseList = async () => {
    let result = await fetch("http://localhost:8000/std", {
      method: "GET",
    });
    result = await result.json();
    setData(result);
  };

  return (
    <>
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
        <b>Student List</b>
      </div>
      <center>
        <div>
          <div style={{ marginTop: "40px" }}>
            <Card
              component={Paper}
              style={{
                backgroundColor: "lightblue",
                width: "1000px",
                border: "solid",
                marginBottom: "20px",
              }}
            >
              <Table sx={{ minWidth: "650px" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">SN.</TableCell>
                    <TableCell align="center">Profile</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Mobile</TableCell>
                    <TableCell align="center">Password</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Fees</TableCell>
                    <TableCell align="center">Viwe More</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: "white" }}>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1 + "."}</TableCell>
                      <TableCell align="center">
                        <Avatar sx={{ backgroundColor: "lightblue" }}>
                          {row.name[0]}
                        </Avatar>
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.mobile}</TableCell>
                      <TableCell align="center">{row.password}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.fees}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="More details...">
                          <Button
                            onClick={() => {
                              setOpen(true);
                              setId(row._id);
                            }}
                          >
                            More
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
          {open && (
            <StudentDetails handleClosee={handleClosee} open={open} id={id} />
          )}
        </div>
        <div></div>
      </center>
    </>
  );
};
