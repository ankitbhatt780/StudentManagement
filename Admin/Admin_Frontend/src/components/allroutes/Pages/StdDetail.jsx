
import  React ,{ useState,useEffect } from 'react';
import {Avatar} from '@mui/material';
import { useParams } from 'react-router-dom';


function StdDetail() {
 
  const [student,setStudent] = useState([]);
  const[course,setCourse] = useState([]);
  const {id} = useParams();

    useEffect(()=>{
    getCourseDetail();
},[])


async function getCourseDetail(){
  let result = await fetch("http://localhost:8000/std/getstudentcourse/"+id);
  if(result.status===200)
  {
    result = await result.json()
    setStudent(result);
    setCourse(result.course);
  }
  else{
  }
}
  return (
    <div>
        <div className='row course'>
            <div className='col-sm'>
            {/* <Avatar  
            style={{width:100,height:100}} className="img"src={'http://localhost:8000/'+
            student.image}/>
                 */}
               <div class="badge bg-primary text-wrap" >Detail List</div>
               <h1>student Detail</h1>
                <Avatar  
            style={{width:80,height:80}} className="img"src={'http://localhost:8000/'+
            student.image}/>
          <b style={{marginLeft:40}}> Student Detail</b>
          <br/>
             <ul class="list-group">
             <li class="list-group-item">
               Name:{student.name}</li>
             <li class="list-group-item">Email:{student.email}</li>
             <li class="list-group-item">Mobile:{student.mobile}</li>
             <li class="list-group-item">Password:{student.password}</li>
             <li class="list-group-item">Address:{student.address}</li>
             <li class="list-group-item">Dob:{student.dob}</li>
             <li class="list-group-item">Gender:{student.gender}</li>
             </ul>
            </div>
            <div className='col-sm'>
            <div class="badge bg-primary text-wrap" >
              </div>
              <br/> <br/><br/>
                <b style={{marginLeft:100}}> Cousre Detail</b>

                <ul class="list-group" >
                <li class="list-group-item">  Cousre Name:{course.course}</li>
             <li class="list-group-item">Branch:{course.branch}</li>
             <li class="list-group-item">Douration In Year:{course.durationInYear}</li>
             <li class="list-group-item">Fees:{course.fees}</li>
             <li class="list-group-item">Total Sem:{course.totalSem}</li>
             <li class="list-group-item">StartYear:{student.startYear}</li>
             <li class="list-group-item">LastYear:{student.lastYear}</li>
             <li class="list-group-item">Subject:{''}{
                course.subject1+","+course.subject2+","+course.subject3
             }</li>
             </ul>
            </div>
        </div>
    </div>
    
  )
}
export default StdDetail;