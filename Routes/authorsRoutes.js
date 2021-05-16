const express = require("express");
const router = express.Router();

router.get("/authorTest1",(req,res)=>{
    res.send({
    statusCode:200,
    msg:" author test 01 success"
    
    })
    })
    
    
module.exports = router;