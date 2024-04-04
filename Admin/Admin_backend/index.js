
 const dbconnect = require("./dbConnection");
 const express = require("express");
 const bodyParser = require('body-parser');
 const courseRouter = require("./routes/courseRoute");
 const studentRouter = require("./routes/studentRoutes");
 const feesRouter = require ("./routes/feesRoute");
 const adminRouter = require("./routes/adminRoutes");
 const cors = require('cors');
 
 const app = express();
 const PORT = 8000;
 dbconnect("mongodb://0.0.0.0:27017/std-management");
 app.use(cors({origin:"*"}));
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/course',courseRouter);
app.use('/std',studentRouter);
app.use('/fees',feesRouter);
app.use("/admin",adminRouter);

 app.listen(PORT,()=>console.log("server is running at "+PORT));