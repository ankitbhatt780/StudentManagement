const express =  require('express');
const {addFees}  = require('../controllers/feesController');
 
const router = express.Router();
router.route('/addfees')
 .post(addFees);
 
//  router.route('/getfeesDetail/:id')
//  .get(getFeesDetailById);

module.exports = router;