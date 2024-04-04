const StudentModel = require("../models/studentModel");
const FeesModel = require("../models/feesModel");
const jwt = require('jsonwebtoken');
const jwtKey = "##dollop$$";



async function newStudent(req, res) {
  console.log(req.body);
  let {
    name,
    email,
    mobile,
    gender,
    address,
    dob,
    courseId,
    startYear,
    lastYear,
    fees,
  } = req.body;
  let password = dob.replaceAll("-", "");
  try {
    let result = await StudentModel.create(
    {
      name,
      email,
      mobile,
      gender,
      address,
      dob,
      courseId,
      startYear,
      lastYear,
      fees,
      password,
    }
    );
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function studentList(req,res)
 {
   //console.log("==========",req.body)
  try {
    let result = await StudentModel.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(409).send(error);
  }
}


async function DeleteList(req, res) {
  try {
    let result = await StudentModel.
    findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(result);
  } catch (error) {
    res.status(409).send(error);
  }
}

async function getstudentbyId(req, res) {
  let id = req.params.id;
  try {
    let result = await StudentModel.findById(id);
    console.log(result);
    res.status(200).send({ status: 200, result: result });
  } catch (error) {
    res.status(409).send(error);
  }
}


async function updateStudent(req, res) {
  const {name,email, mobile,gender,address, dob} = req.body.value;

  //console.log(req.params.id);
  console.log(req.body);
  try {
    let result = await StudentModel.findByIdAndUpdate
    (req.params.id,
      {name, email, mobile, gender, address, dob});
    res.status(200).send({ status: 200, result: result });
  } catch (error) {
    return res.status(400).send(error);
  }
}

// student and course detail
     async function  getstudentDetailbyId(req,res)
{
 if(req.params.id)
 {
   const id = req.params.id;
  // console.log("---",id);
   try{
     let result = await StudentModel.aggregate(
       [
         {
           $match:{$expr:{$eq:['$_id',{$toObjectId:id}]}}
         },
         {
           $lookup:{
             from:"courses",
             localField:"courseId",
             foreignField:"_id",
             as:"course"
           }
         },
         {
           $unwind:"$course"
         },

       ]
     );
let FeesDetail = await FeesModel.aggregate([
  {
    $match:{ $expr:{ $eq:["$stdId",{$toObjectId:id }]}},
  },
  {
    $group:{_id:"$stdId",fees:{$sum:"$fees"}},
  },
]);
//console.log(FeesDetail);
if(FeesDetail.length==0)
{
  FeesDetail={_id:id,fees:0};
}
else{
  FeesDetail = FeesDetail[0];
}

if(result)
{
  //console.log(result);
  //console.log(FeesDetail);
  return res.status(200).send({msg:"success",result:result,fees:FeesDetail});
}
else {
    return res.status(401).send({msg:`student not found`});
}
  
}
catch(err)
{
return  res.status(400).json(err);
}
 }
}


async function studentLogin(req,res){
  const{email,password} = req.body;
 try{
   let admin = await StudentModel.findOne({email,password}); 
  // console.log(admin);
  
   const payload ={email:admin.email,
      password:admin.password};
   const token = jwt.sign(payload,jwtKey);
   //console.log(payload);
   //console.log(token);
   res.status(200).json({admin:admin,token:token});
 }
 catch(error){
 return res.status(400).send({error:"something went wrong"})
 }
}


 
  module.exports = {newStudent ,studentList, DeleteList,getstudentbyId,updateStudent,
    getstudentDetailbyId,studentLogin};
