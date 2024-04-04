const mongoose = require ('mongoose');
function dbconnect(url)
{
    mongoose.connect(url).then(()=>
    {
        console.log("Db connected");
    })
}
module.exports = dbconnect