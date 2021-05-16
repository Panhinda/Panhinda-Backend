const express = require("express");
const router = express.Router();


//USER API GUIDE
/* 1. create a user
   2. update a user
   3. user login (get the username and password and match them)
   4. delete a user
   5. get all users

*/
router.get("/Usertest1",(req,res)=>{
    res.send({
    statusCode:200,
    msg:"success"
    
    })
    })
    
    
module.exports = router;