
import  React ,{ useState,useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

function CourseList() {
  const[list,setList] = useState([]);
    useEffect(()=>{
    getCourseDetail();
},[])
async function getCourseDetail(){
  let result = await fetch("http://localhost:8000/course/getcourse");
  if(result.status===200)
  {
    result = await result.json()
    setList(result);
  }
  else{
  }
}
async function deleteCourse(id)
{
  let result = await fetch("http://localhost:8000/course/deletecourse/"+id,{
  method:"DELETE"
});
console.log("res",result);
getCourseDetail();
}
  return (
    <div  className='Container' style={{left:250,  margin:25}}>
      <h3>Course List</h3>
      <table className = "table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Course</th>
            <th scope="col">Branch</th>
            <th scope="col">DurationInYear</th>
            <th scope="col">Semesters</th>
            <th scope="col">Fees</th>
            <th scope='col'>Subjects</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
          </thead>
          <tbody>
            {list.map((course_data,index)=>{
               return<tr key={index}>
                <th scope="row">{index+1}</th>
                 <td>{course_data.course}</td> 
                <td>{course_data.branch}</td>
                <td>{course_data.durationInYear}</td>
                <td>{course_data.totalSem}</td>
                <td>{course_data.fees}</td>
               <td>{course_data.subject1+","+course_data.subject2+","+course_data.subject3}</td>
              <td>
                   <Link to={`/updateCourse/${course_data._id}`}>
                    <EditIcon/>
                     </Link> </td>
                <td onClick={()=>{deleteCourse(course_data._id)}}>
                   <DeleteIcon/></td> 
              </tr>
            })}
          </tbody>
      </table>
    </div>
  )
}
export default CourseList;