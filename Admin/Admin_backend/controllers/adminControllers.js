const AdminModel = require("../models/adminModel");
const jwt = require('jsonwebtoken');
const jwtKey = "##dollop$$";

async function adminLogin(req, res) {
  const { email, password } = req.body;
  try {
    let admin = await AdminModel.findOne({ email, password });
    // console.log(admin);

    const payload = {
      email: admin.email,
      password: admin.password
    };
    const token = jwt.sign(payload, jwtKey);
    //console.log(payload);
    //console.log(token);
    res.status(200).json({ admin: admin, token: token });
  }
  catch (error) {
    return res.status(400).send({ error: "something went wrong" })
  }
}
module.exports = { adminLogin };

