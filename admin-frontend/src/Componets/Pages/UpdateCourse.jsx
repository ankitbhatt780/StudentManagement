import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

import DownloadDoneOutlinedIcon from "@mui/icons-material/DownloadDoneOutlined";

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

export const UpdateCourse = (currentId, setCurrentI) => {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* console.log(currentId); */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Add Course---</h2>

          <form onSubmit={handleOpen(setOpen(true))}>
            <TextField
              label="Enter_Course"
              variant="standard"
              style={{ width: "300px", marginBottom: "10px" }}
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
              style={{ width: "300px", marginBottom: "10px" }}
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
              style={{ width: "300px", marginBottom: "10px" }}
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
              style={{ width: "300px", marginBottom: "10px" }}
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
            <TextField
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
            />
            <DialogActions style={{ backgroundColor: "lightblue" }}>
              <Button onClick={handleClose}>Cancle</Button>
              <Button type="submit">
                <DownloadDoneOutlinedIcon />
                Save
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
