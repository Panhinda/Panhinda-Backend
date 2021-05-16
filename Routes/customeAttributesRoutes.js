const express = require("express");
const router = express.Router();

router.get("/customAttributesTest1",(req,res)=>{
    res.send({
    statusCode:200,
    msg:" custom attributes test 01 success"
    
    })
    })
    
    
module.exports = router;