const CourseModel = require("../models/courseModel");

async function addCourse(req, res) {
  //console.log(req.body);
  let { course, branch, durationInYear, fees, subject1, subject2, subject3 } = req.body;
  console.log(req.body);
  let totalSem = (durationInYear * 12) / 6;
  branch = course + "-" + branch;
  try {
    let result = await CourseModel.create({course,branch,durationInYear
      ,fees,totalSem,subject1,subject2,subject3,});
    res.status(200).send(result);
   
  } catch (error) {
    res.status(400).send(error);
  }
}


async function courseList(req,res)
 {
   //console.log("==========",req.body)
  try {
    let result = await CourseModel.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(409).send(error);
  }
}


async function DeleteList(req, res) {
  try {
    let result = await CourseModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(result);
  } catch (error) {
    res.status(409).send(result);
  }
}

async function getcousrebyId(req, res) {
  let = req.params.id;

  try {
    let result = await CourseModel.findById(req.params.id);
    res.status(200).send({ status: 200, result: result });
  } catch (error) {
    res.status(409).send(error);
  }
}

async function updateCourse(req, res) {
  const { course, branch, durationInYear, fees, subject1 } = req.body.value;
  let totalSem = (durationInYear * 12) / 6;
  //console.log(req.params.id);
  console.log(req.body);
  try {
    let result = await CourseModel.findByIdAndUpdate(req.params.id,
      {course,branch,durationInYear,fees,totalSem,subject1,
    });
    res.status(200).send({ status: 200, result: result });
  } catch (error) {
    return res.status(400).send(error);
  }
}
module.exports = {addCourse,courseList,updateCourse,getcousrebyId, DeleteList,};
