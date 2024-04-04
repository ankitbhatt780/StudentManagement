import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

// const CreateBatch = () => {
//   React.useEffect(() => {
//     teachersList();
//     subjectList();
//     courseList();
//   }, []);

//   const [teacher, setTeacher] = useState([]);
//   const [subject, setSubject] = useState([]);
//   const [course, setCourse] = useState([]);
//   const [totalSem, setTotalSem] = useState([1, 2, 3, 4]);
//   const [tSub, setTSub] = useState([]);

//   console.log(tSub);

//   const teachersList = async () => {
//     let result = await fetch("http://localhost:8000/teachers/teacher", {
//       method: "GET",
//     });
//     result = await result.json();
//     setTeacher(result);
//   };
//   const subjectList = async () => {
//     let result = await fetch("http://localhost:8000/sub/newSubject", {
//       method: "GET",
//     });
//     result = await result.json();
//     setSubject(result);
//   };
//   const courseList = async () => {
//     let result = await fetch("http://localhost:8000/course/course", {
//       method: "GET",
//     });
//     result = await result.json();
//     setCourse(result);
//     console.log("sem--->", result[0].totalSem);
//   };
//   const getTeacherSub = async () => {
//     let result = await fetch(
//       `http://localhost:8000/teachers/gettechersub/${tSub}`,
//       {
//         method: "GET",
//       }
//     );
//     result = await result.json();
//     setCourse(result);
//     console.log(result);
//     console.log("subjects______", result.result[0].techSubject.split(","));
//   };
//
//   const onSubmit = async (value) => {
//     console.log("text", value);
//   };
//   return (
//     <>
//       <center>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             width: "90%",
//             marginTop: "20px",
//             backgroundColor: "lightblue",
//           }}
//         >
//           <Button onClick={handleOpen}>Create Batch</Button>
//           <Button onClick={handleOpen}>Create Batch</Button>
//           <div>
//             <Modal
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >
//               <Box sx={style}>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div
//                     style={{ display: "flex", justifyContent: "space-around" }}
//                   >
//                     <select {...register("sem")}>
//                       {totalSem.map((val, index) => {
//                         return <option>{val + "-Sem"}</option>;
//                       })}
//                     </select>
//                     <label>Salect Subject :</label>

//                     <select
//                       className="form-control mt-2"
//                       {...register("subject")}
//                     >
//                       <option value="" />
//                       {subject.map((sub, index) => (
//                         <option value={sub._id} key={index}>
//                           {sub.subject}
//                         </option>
//                       ))}
//                     </select>
//                     <label>Salect Teacher :</label>
//                     <select
//                       className="form-control mt-2"
//                       {...register("teacher")}
//                       onChange={(e) => {
//                         let i = e.target.value;
//                         setTSub(i);
//                         getTeacherSub();
//                         console.log("Tsub->", tSub);
//                       }}
//                     >
//                       <option value="" />
//                       {teacher.map((tech, index) => (
//                         <option value={tech._id} key={index}>
//                           {tech.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <center>
//                     <Button type="submit">save</Button>
//                   </center>
//                 </form>
//               </Box>
//             </Modal>
//           </div>
//         </div>
//       </center>
//     </>
//   );
// };
// export default CreateBatch;

const CreateBatch = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [course, setCourse] = useState([]);
  const [totalSem, setTotalSem] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [tSub, setTSub] = useState([""]);
  const [subject, setSubject] = useState([]);
  console.log(tSub);
  const courseList = async () => {
    let result = await fetch("http://localhost:8000/course/course", {
      method: "GET",
    });
    result = await result.json();
    setCourse(result);
    // console.log("sem--->", result[0].totalSem);
  };
  const getTeacherSub = async () => {
    let result = await fetch(
      `http://localhost:8000/teachers/gettechersub/${tSub}`,
      {
        method: "GET",
      }
    );
    result = await result.json();
    setTSub(result.result);
    //console.log("subjects______", result.techSubject.split(","));
  };
  const teachersList = async () => {
    let result = await fetch("http://localhost:8000/teachers/teacher", {
      method: "GET",
    });
    result = await result.json();
    setTeacher(result);
  };
  const subjectList = async () => {
    let result = await fetch("http://localhost:8000/sub/newSubject", {
      method: "GET",
    });
    result = await result.json();
    setSubject(result);
  };
  React.useEffect(() => {
    teachersList();
    courseList();
    subjectList();
  }, []);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({});
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
          marginTop: "20px",
          height: "30px",
          backgroundColor: "lightblue",
          padding: "5px",
        }}
      >
        <Button variant="outlined" onClick={handleOpen}>
          Create Batch
        </Button>
        <Button variant="outlined" onClick={handleOpen}>
          Batch List
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ height: "200px" }}>
            <center>
              <h2>Create Batch</h2>
            </center>
            <label>Salect Course : </label>
            <select
              className="form-control mt-2"
              style={{ marginRight: "10px" }}
              onChange={(e) => {
                let sem = [];
                for (let i = 1; i <= e.target.value; i++) {
                  sem.push(i);
                }
                setTotalSem(sem);
              }}
            >
              <option value="" />
              {course.map((course, index) => (
                <option value={course.totalSem} key={index}>
                  {course.branch}
                </option>
              ))}
            </select>
            <select style={{ marginRight: "10px" }}>
              {totalSem.map((val, index) => {
                return <option>{val + "-Sem"}</option>;
              })}
            </select>
            <label>Salect Teacher : </label>
            <select
              className="form-control mt-2"
              style={{ marginRight: "10px" }}
              onChange={(e) => {
                let sub = [];
                setTSub(e.target.value.toString().split(","));
              }}
            >
              <option value="" />
              {subject.map((tech, index) => (
                <option value={tech.subject} key={index}>
                  {tech.subject}
                </option>
              ))}
            </select>
            <select
              className="form-control mt-2"
              style={{ marginRight: "10px" }}
            >
              <option value="">
                {tSub.map((sub, index) => (
                  <option value="" key={index}>
                    {sub}
                  </option>
                ))}
              </option>
            </select>

            {/* <select
              className="form-control mt-2"
              style={{ marginRight: "10px" }}
            >
              <option value="">
                {teacher.map((sub, index) => (
                  <option value="" key={index}>
                    {sub.name}
                  </option>
                ))}
              </option>
            </select> */}
          </div>
          <center>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </center>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateBatch;
