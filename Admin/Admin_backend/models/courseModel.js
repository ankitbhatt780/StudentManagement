const mongoose = require("mongoose");

const CourseSchema =  new mongoose.Schema({
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true,
        unique:true,
    },
     durationInYear:{
        type:Number,
        required:true
    },
    totalSem:{
        type:String,
        required:true,
        default:0
    },
    fees:{
        type:Number,
        required:true
    },
    subject1:{
        type:String,
        required:true,
    },
    subject2:{
        type:String,
        required:true,
    },
    subject3:{
        type:String,
        required:true,
    }

},{ timestamps:true});

const CourseModel =  mongoose.model('course',CourseSchema);
module.exports = CourseModel;