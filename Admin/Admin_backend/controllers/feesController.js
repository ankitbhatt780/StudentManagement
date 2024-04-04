const FeesModel = require("../models/feesModel")

async function addFees(req,res)
{
    
let {fees,stdId} = req.body;
  try{
        let result =
         await FeesModel.create({fees,stdId});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }

}
   
module.exports = {addFees,}