const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema(
  {
        email:{
            type:String,
            required:true,
            unique:true,
         },
        password:{
            type :String,
            required:true,
        }
    },
    {timestamps:true}
);
const AdminModel = mongoose.model("admins",adminSchema);
module.exports = AdminModel;
