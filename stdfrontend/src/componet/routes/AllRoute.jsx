import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Attendance from "../pages/Attendance";
import ExamDetail from "../pages/ExamDetail";
import StdFee from "../pages/StdFeesDetail";
import StdLibrary from "../pages/StdLibrary";
import Profile from "../pages/Profile";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/ExamDetail" element={<ExamDetail />} />
        <Route path="/StdFee" element={<StdFee />} />
        <Route path="/Library" element={<StdLibrary />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
};
export default AllRoutes;
