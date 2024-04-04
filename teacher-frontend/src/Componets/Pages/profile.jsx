import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
let today = new Date().toLocaleDateString();

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const teachers = JSON.parse(Cookies.get("teachers"));
  const [courseId, setCourseId] = React.useState(teachers.courseId);
  const [students, setStudents] = React.useState([]);
  const [value, setValue] = React.useState(0);
  console.log("hii---->", students);
  const roll = today.split("/");
  const getStudentByCouse = async () => {
    let result = await fetch(
      `http://localhost:8000/teachers/getstudentBycourse/${courseId}`,
      {
        method: "GET",
      }
    );
    result = await result.json();
    setStudents(result.result);
  };

  React.useEffect(() => {
    getStudentByCouse();
  }, []);

  // setTimeout(function () {
  //   getStudentByCouse();
  // }, 10000);

  const handleChange = (event: React.SyntheticEvent, newValue: Number) => {
    setValue(newValue);
  };
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({});
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="ATTENDANCE" {...a11yProps(0)} />
          <Tab label="STUDENT REPORT" {...a11yProps(1)} />
          <Tab label="TEXT" {...a11yProps(2)} />
          <Tab label="INFORMATION" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div style={{ height: "300px" }}>
          <div
            style={{
              backgroundColor: "lightblue",
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <b>ATTENDANCE</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              class="PageInstruction"
              id="PageInstruction"
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-around",
                margin: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "lightblue",
                  // width: "30%",
                  padding: "3px",
                  borderRadius: "5px",
                }}
              >
                <b>Total Student :{students.length}</b>
              </div>
              <div
                style={{
                  backgroundColor: "lightblue",
                  padding: "3px",
                  borderRadius: "5px",
                }}
              >
                <b>Total Present : 0</b>
              </div>
              <div
                style={{
                  backgroundColor: "lightblue",
                  // width: "30%",
                  padding: "3px",
                  borderRadius: "5px",
                }}
              >
                <b>Date :{today} </b>
              </div>
            </div>
          </div>
          <div style={{ height: "15em", overflow: "scroll" }}>
            {" "}
            <table style={{ width: "100%" }}>
              <tr style={{ backgroundColor: "whitesmoke" }}>
                <th class="col1">S.No</th>
                <th class="col2">Students Name</th>
                <th class="col2">Roll No.</th>
                <th class="col1">Attendance</th>
              </tr>
              <tbody>
                {students.map((value, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: "lightblue",
                      borderRadius: "5px",
                    }}
                  >
                    <td class="qid">{index + 1}.</td>
                    <td class="options">{value.teacher.name}</td>
                    <td class="options">
                      {roll}
                      {index}
                    </td>
                    <td class="duration">
                      <FormControl>
                        <FormLabel id="demo-row-redio-buttons-group-label" />
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          name="attendance"
                          render={({ field }) => (
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-redio-buttons-group-label"
                              {...field}
                            >
                              <FormControlLabel
                                value="present"
                                control={<Radio />}
                                label="P"
                              />
                              <FormControlLabel
                                value="absent"
                                control={<Radio defaultChecked />}
                                label="A"
                              />
                              <FormControlLabel
                                value="leave"
                                control={<Radio />}
                                label="L"
                              />
                            </RadioGroup>
                          )}
                        ></Controller>
                      </FormControl>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "1%",
              }}
            >
              <Button variant="contained">save</Button>
              <Button variant="contained">edit</Button>
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{
            backgroundColor: "lightblue",
            // width: "30%",
            padding: "3px",
            borderRadius: "5px",
          }}
        >
          <b>Total Student :{students.length}</b>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "50px",
          }}
        >
          <tbody style={{ width: "50%", height: "10em", overflow: "scroll" }}>
            <tr>
              <th class="col1">S.No</th>
              <th class="col2">Students Name</th>
              <th class="col2">Father Name</th>
              <th class="col1">Attendance</th>
            </tr>
            {students.map((value, index) => (
              <tr
                key={index}
                style={{
                  borderRadius: "5px",
                }}
              >
                <td class="qid">{index + 1}.</td>
                <td class="options">{value.teacher.name}</td>
                <td class="options">{value.teacher.fname}</td>
                <td class="duration">(P/A): </td>
              </tr>
            ))}
          </tbody>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <center>
          {" "}
          <div
            style={{
              height: "300px",
              width: "98%",
              backgroundColor: "lightblue",
              borderRadius: "10px",
            }}
          ></div>
        </center>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <center>
          {" "}
          <div
            style={{
              height: "300px",
              width: "98%",
              backgroundColor: "lightblue",
              borderRadius: "10px",
            }}
          ></div>
        </center>
      </CustomTabPanel>
    </Box>
  );
}
