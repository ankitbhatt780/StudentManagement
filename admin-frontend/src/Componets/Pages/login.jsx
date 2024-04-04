import * as React from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [msg, setMsg] = useState();
  const [msgType, setMsgType] = useState();
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    try {
      let res = await fetch("http://localhost:8000/admin/login", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "content-type": "application/json" },
      });
      // console.log(res.status);
      if (res.status === 200) {
        res = await res.json();
        navigate("/home");
      } else if (res.status === 401) {
        setMsg("Incorrect email or password");
        setMsgType("danger");
      }
    } catch (error) {
      setMsg("Something went worng plz check");
      setMsgType("danger");
    }
    console.log("login successful", value);
  };
  const containerStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    height: "100vh",
  };

  return (
    <>
      <div>
        <div className="home">
          <div className="log1">
            <div style={containerStyle}>
              {msg && (
                <div className={"alert alert-" + msgType} role="alert">
                  {msg}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5 nav">
                  <h2 className="text-light mb-2">Login</h2>
                  <TextField
                    className="w-20 mb-3 bg-light"
                    placeholder="Enter Your Email"
                    {...register("email", {
                      required: {
                        message: "Email is required",
                      },
                      pattern: {
                        message: "Invalid Email",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                  <TextField
                    className="w-20 mb-3 bg-light"
                    placeholder="Enter Your password"
                    type="password"
                    {...register("password", {
                      required: {
                        message: "password is Required",
                      },
                      pattern: {
                        // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                        message: "Invalid password",
                      },
                    })}
                    error={!!errors.password}
                    hellperText={errors?.password?.message}
                  />

                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    className="btn btn-primary  mt-2"
                  >
                    {" "}
                    submit{" "}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
