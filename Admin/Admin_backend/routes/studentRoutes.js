const express =  require('express');
const {newStudent, studentList,DeleteList,updateStudent,getstudentbyId,getstudentDetailbyId,studentLogin} = require('../controllers/studentController')

const router = express.Router();

router.route('/login')
.post(studentLogin)
 router.route('/addStudents')
.post(newStudent)

 router.route('/getstudent')
.get(studentList)

 router.route('/deletestudent/:id')
 .delete(DeleteList)
 
 router.route('/updatestudent/:id')
 .patch(updateStudent)

 router.route('/getstudent/:id')
.get(getstudentbyId) 

//student and course detail
 router.route('/getstudentdetail/:id')
 .get(getstudentDetailbyId)


module.exports = router;