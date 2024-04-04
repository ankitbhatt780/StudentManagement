import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Card, IconButton, TextField, Tooltip } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import DownloadDoneOutlinedIcon from "@mui/icons-material/DownloadDoneOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UpdateCourse } from "./UpdateCourse";

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

export default function Course() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [data, setData] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [currentId, setCurrentId] = React.useState(null);

  React.useEffect(() => {
    courseList();
    subjectList();
  }, []);

  const edit = (id) => {
    // console.log(id);
    setCurrentId(id);
  };

  const courseList = async () => {
    let result = await fetch("http://localhost:8000/course/course", {
      method: "GET",
    });
    result = await result.json();
    setData(result);
  };
  // console.log("Subject--->", subject);

  const subjectList = async () => {
    let result = await fetch("http://localhost:8000/sub/newSubject", {
      method: "GET",
    });
    result = await result.json();
    setSubject(result);
  };
  const addData = async (values) => {
    console.log(values);
    const result = await fetch("http://localhost:8000/course/course", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "content-type": "application/json" },
    });
    reset();
    handleClose(true);
    console.log(result);
  };
  const deleteCourse = async (id) => {
    console.log(id);
    let result = await fetch(
      `http://localhost:8000/course/deleteCourse/${id}`,
      { method: "DELETE" }
    );
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
        {currentId && (
          <UpdateCourse currentId={currentId} setCurrentId={setCurrentId} />
        )}
        <Button onClick={handleOpen}>Add Course</Button>
        <Button>Course List</Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>ADD COURSE ➣ </h2>

            <form onSubmit={handleSubmit(addData)}>
              <TextField
                label="Enter_Course"
                variant="standard"
                style={{
                  width: "150px",
                  marginBottom: "10px",
                  marginRight: "3px",
                }}
                type="text"
                {...register("course", {
                  required: {
                    value: true,
                    message: "Course is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid Course",
                  },
                })}
                error={!!errors.course}
                helperText={errors?.course?.message}
              />
              <TextField
                style={{ width: "150px", marginBottom: "10px" }}
                type="text"
                label="Enter_Branch"
                variant="standard"
                placeholder="Enter_Branch"
                {...register("branch", {
                  required: {
                    value: true,
                    message: "Branch is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid Branch",
                  },
                })}
                error={!!errors.branch}
                helperText={errors?.branch?.message}
              />
              <TextField
                style={{
                  width: "150px",
                  marginBottom: "10px",
                  marginRight: "3px",
                }}
                type="text"
                label="DurationInYear"
                variant="standard"
                // placeholder="DurationInYear"
                {...register("durationInYear", {
                  required: {
                    value: true,
                    message: "DurationInYear is Required",
                  },
                  pattern: {
                    value: "(?<!d)d{10}(?!d)",
                    message: "Invalid DurationInYear",
                  },
                })}
                error={!!errors.durationInYear}
                helperText={errors?.durationInYear?.message}
              />
              <TextField
                style={{
                  width: "150px",
                  marginBottom: "10px",
                  marginRight: "15px",
                }}
                type="Text"
                label="00,000,00"
                variant="standard"
                {...register("fees", {
                  required: {
                    value: true,
                    message: "Fees is Required",
                  },
                  pattern: {
                    value: "^[1-9]d{0,7}(?:.d{1,4})?$",
                    message: "Invalid fees",
                  },
                })}
                error={!!errors.fees}
                helperText={errors?.fees?.message}
              />
              <label>subject 1:</label>
              <select
                style={{
                  width: "100px",
                  height: "30px",
                  marginTop: "10px",
                  borderRadius: "4px",
                  backgroundColor: "lightblue",
                }}
                className="form-control mt-2"
                {...register("subject1")}
              >
                <option />
                {subject.map((result, index) => (
                  <option value={result.subject} key={index}>
                    {result.subject}
                  </option>
                ))}
              </select>
              <br />
              <label>subject 2:</label>

              <select
                style={{
                  width: "100px",
                  height: "30px",
                  marginTop: "10px",
                  borderRadius: "4px",
                  backgroundColor: "lightblue",
                }}
                className="form-control mt-2"
                {...register("subject2")}
              >
                <option value="" />
                {subject.map((result, index) => (
                  <option value={result.subject} key={index}>
                    {result.subject}
                  </option>
                ))}
              </select>
              <br />

              <label>subject 3:</label>

              <select
                style={{
                  width: "100px",
                  height: "30px",
                  marginTop: "10px",
                  borderRadius: "4px",
                  backgroundColor: "lightblue",
                }}
                className="form-control mt-2"
                {...register("subject3")}
              >
                <option value="" />
                {subject.map((result, index) => (
                  <option value={result.subject} key={index}>
                    {result.subject}
                  </option>
                ))}
              </select>
              <br />

              <label>subject 4:</label>

              <select
                style={{
                  width: "100px",
                  height: "30px",
                  marginTop: "10px",
                  borderRadius: "4px",
                  backgroundColor: "lightblue",
                }}
                className="form-control mt-2"
                {...register("subject4")}
              >
                <option value="" />
                {subject.map((result, index) => (
                  <option value={result.subject} key={index}>
                    {result.subject}
                  </option>
                ))}
              </select>
              {/* <TextField
                label="Enter_Subject-1"
                variant="standard"
                style={{
                  width: "150px",
                  marginBottom: "10px",
                  marginRight: "3px",
                }}
                type="text"
                {...register("subject1", {
                  required: {
                    value: true,
                    message: "subject1 is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid subject1",
                  },
                })}
                error={!!errors.subject1}
                helperText={errors?.subject1?.message}
              />
              <TextField
                label="Enter_Subject-2"
                variant="standard"
                style={{ width: "150px", marginBottom: "10px" }}
                type="text"
                {...register("subject2", {
                  required: {
                    value: true,
                    message: "subject2 is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid subject2",
                  },
                })}
                error={!!errors.subject2}
                helperText={errors?.subject2?.message}
              />
              <TextField
                label="Enter_Subject-3"
                variant="standard"
                style={{
                  width: "150px",
                  marginBottom: "10px",
                  marginRight: "3px",
                }}
                type="text"
                {...register("subject3", {
                  required: {
                    value: true,
                    message: "subject3 is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid subject3",
                  },
                })}
                error={!!errors.subject3}
                helperText={errors?.subject3?.message}
              />
              <TextField
                label="Enter_Subject-4"
                variant="standard"
                style={{ width: "150px", marginBottom: "10px" }}
                type="text"
                {...register("subject4", {
                  required: {
                    value: true,
                    message: "subject4 is Required",
                  },
                  pattern: {
                    value: /^[A-Z]{1}[A-Za-z ]+$/,
                    message: "Invalid subject4",
                  },
                })}
                error={!!errors.subject4}
                helperText={errors?.subject4?.message}
              /> */}

              <DialogActions style={{ backgroundColor: "lightblue" }}>
                <Button onClick={handleClose}>
                  <ClearOutlinedIcon />
                  Cancle
                </Button>
                <Button type="submit">
                  <DownloadDoneOutlinedIcon />
                  Save
                </Button>
              </DialogActions>
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
                  <TableCell align="right">Course</TableCell>
                  <TableCell align="right">Branch</TableCell>
                  <TableCell align="right">DurationInYear</TableCell>
                  <TableCell align="right">TotalSem</TableCell>
                  <TableCell align="right">Fees</TableCell>
                  <TableCell align="right">Subjects</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor: "white" }}>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="right">{index + 1 + "."}</TableCell>
                    <TableCell align="right">{row.course}</TableCell>
                    <TableCell align="right">{row.branch}</TableCell>
                    <TableCell align="right">
                      {row.durationInYear}-Year
                    </TableCell>
                    <TableCell align="right">{row.totalSem}- Sem</TableCell>
                    <TableCell align="right">₹-{row.fees}.00</TableCell>
                    <TableCell align="right">
                      {row.subject1}, {row.subject2},{row.subject3},
                      {row.subject4}
                    </TableCell>
                    <TableCell align="right">
                      {/* <EditIcon
                        onClick={() => edit(row._id)}
                        style={{ marginRight: "2px" }}
                      /> */}

                      {/* <DeleteIcon onClick={() => deleteCourse(row._id)} /> */}
                      <Tooltip title="Delete">
                        <IconButton>
                          <DeleteIcon onClick={() => deleteCourse(row._id)} />
                        </IconButton>
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
