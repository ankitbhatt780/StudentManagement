import { Avatar, Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  border: "1px solid #000",
  boxShadow: 100,
  p: 4,

  bgcolor: "lightblue",
};
function StudentDetails({ handleClosee, open, id }) {
  const [stdList, setStdList] = useState([]);
  const [course, setCourse] = useState([]);
  const [stdId, setstdId] = useState(id);

  useEffect(() => {
    studentListById(id);
  }, []);

  const studentListById = async (id) => {
    console.log("====>", id);
    let result = await fetch("http://localhost:8000/std/getStdById/" + id, {
      method: "GET",
    });
    result = await result.json();
    console.log(result.result[0]);
    setStdList(result.result[0]);
    setCourse(result.result[0].course);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClosee}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            <table style={{ width: "50%" }}>
              <tr>
                <td>
                  <b>Name :</b>
                </td>
                <td> {stdList.name}</td>
              </tr>
              <tr>
                <td>
                  <b>Email :</b>
                </td>
                <td> {stdList.email}</td>
              </tr>
              <tr>
                <td>
                  <b>Father Name :</b>
                </td>
                <td> {stdList.fname}</td>
              </tr>
              <tr>
                <td>
                  <b>Mother Name :</b>
                </td>
                <td> {stdList.mname}</td>
              </tr>
              <tr>
                <td>
                  <b>Gender :</b>
                </td>
                <td> {stdList.gender}</td>
              </tr>
              <tr>
                <td>
                  <b>Mobile :</b>
                </td>
                <td> {stdList.mobile}</td>
              </tr>
              <tr>
                <td>
                  <b>Address :</b>
                </td>
                <td> {stdList.address}</td>
              </tr>
            </table>
            <hr />
            <hr />
            <table style={{ width: "50%" }}>
              {" "}
              <tr>
                <td>
                  <b>Course :</b>
                </td>
                <td> {course.course}</td>
              </tr>
              <tr>
                <td>
                  <b>Branch :</b>
                </td>
                <td> {course.branch}</td>
              </tr>
              <tr>
                <td>
                  <b>DurationInYear :</b>
                </td>
                <td>
                  {" "}
                  {course.durationInYear} -<u>(Year)</u>
                </td>
              </tr>
              <tr>
                <td>
                  <b>TotalSem :</b>
                </td>
                <td>
                  {" "}
                  {course.totalSem}-<u>(Sem)</u>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Fees :</b>
                </td>
                <td> {course.fees}</td>
              </tr>
              <tr>
                <td>
                  <b>Password :</b>
                </td>
                <td> {stdList.password}</td>
              </tr>
            </table>
          </div>
          <center>
            <button
              style={{ marginTop: "10px", height: "30px" }}
              onClick={handleClosee}
            >
              close
            </button>
          </center>
        </Box>
      </Modal>
    </>
  );
}
export default StudentDetails;
