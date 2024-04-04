
import  React ,{ useState,useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { Link,} from 'react-router-dom';
import {Avatar} from '@mui/material';
import Button from 'react-bootstrap/Button';
import FeesDetail from './feesModal';



function StudentList() {
  const [id,setId] = useState();
  const[list,setList] = useState([]);
  const[basicModal,setBasicModal] = useState(false);
  const StdId = (id)=>setId(id);
  const closeModal=()=>setBasicModal(false)
 
 
    useEffect(()=>{
    getCourseDetail();
},[])
async function getCourseDetail()
{
  let result = await 
  fetch("http://localhost:8000/std/getstudent");
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
  let result = await fetch("http://localhost:8000/std/deletestudent/"+id,{
  method:"DELETE"
});
console.log("res",result);
getCourseDetail();
}
  return (
    <div  className='Container'style={{left:250,  margin:25}}>
      <h3>Student List</h3>
      <table className = "table table-sm table-dark"> 
        <thead className='bg-primary'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
            <th scope='col'>Fees</th>
          </tr>
          </thead>
          <tbody>
            {list.map((student_data,index)=>{
               return<tr key={index}>
                <th scope="row">{index+1}</th>
                <td><Avatar src={'http://localhost:8000/'+student_data.image}>
                  </Avatar></td> 
                 <td><Link to={`/stdDetail/${student_data._id}`}>{student_data.name}</Link></td> 
                 <td>{student_data.email}</td> 
                 <td>{student_data.mobile}</td> 
               <td>
                    <Link to={`/updateStudent/${student_data._id}`}>
                    <EditIcon  />
                     </Link> </td>
                <td onClick={()=>{deleteCourse(student_data._id)}}>
                   <DeleteIcon/></td> 
               
                 <td> <Button className='btn btn -primary' onClick={()=>{
                   setBasicModal(true);
                    StdId(student_data._id);
                  }}> {student_data.fees}^</Button></td>
              </tr> 
            })}
          </tbody>
      </table>
      {basicModal && (<FeesDetail
      closeModal={closeModal}
      id={id}
      />)}
    </div>
  )
}
export default StudentList;

