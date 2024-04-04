const express =  require('express');
const {addCourse,courseList,updateCourse, getcousrebyId,DeleteList} = require('../controllers/courseController');
 
const router = express.Router();
router.route('/addcourse')
 .post(addCourse);
router.route('/getcourse')
.get(courseList)
 
 router.route('/updatecourse/:id')
 .patch(updateCourse)

 router.route('/deletecourse/:id')
 .delete(DeleteList)
 
 router.route('/getcourse/:id')
 .get( getcousrebyId)

module.exports = router;