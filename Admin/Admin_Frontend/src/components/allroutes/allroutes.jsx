import React from 'react'
import {  Routes, Route } from "react-router-dom";
import AddCourse from './Pages/addCourse'; 
import CourseList from './Pages/courseList';
import UpdateCourse from './Pages/updateCourse';
import AddStudent from './Pages/addStudent';
import StudentList from './Pages/studentList';
import UpdateStudent from './Pages/updateStudent';
import StdDetail from './Pages/StdDetail';
import AdminLogin from './Pages/adminlogin';
import Header from './Pages/home';
import Logout from './Pages/logout';

function Allroutes() {
  return (
    <Routes>
        <Route path='/' 
         element={<AdminLogin/>}></Route>
        <Route path='/logout' 
         element={<Logout/>}></Route> 
        <Route path='/home' element={<Header/>}></Route>
        <Route path='/AddCourse' element={<AddCourse/>}></Route>
        <Route path='/courseList' element={<CourseList/>}></Route>
        <Route path='/updateCourse/:id' element={<UpdateCourse/>}></Route>
        <Route path='/addStudent' element={<AddStudent/>}></Route>
        <Route path='/studentList' element={< StudentList/>}></Route>
        <Route path='/updateStudent/:id' element={<UpdateStudent/>}></Route>
        <Route path='/stdDetail/:id' element={<StdDetail/>}></Route>
    </Routes>
  )
}

export default Allroutes;