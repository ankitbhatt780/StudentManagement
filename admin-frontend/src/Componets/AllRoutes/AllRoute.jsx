import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/home";
import Login from "../Pages/login";

import Teachers from "../Pages/teachers";
import { Students } from "../Pages/students";
import { StudentList } from "../Pages/StudentList";
import Quiz from "../Pages/Quiz";
import CreateBatch from "../Pages/CreateBatch";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/studentList" element={<StudentList />} />
        <Route path="/studentList" element={<Quiz />} />
        <Route path="/batch" element={<CreateBatch />} />
      </Routes>
    </div>
  );
};
export default AllRoutes;
