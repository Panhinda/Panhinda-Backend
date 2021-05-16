const express = require("express");
const router = express.Router();
const db = require('../Db/db')

// POST API GUIDE
/* 1. create a post by id
   2. update a post by id
   3. delete a post by id
   4. get a post by id
   5. get all post as an array
   

*/
//GET ALL POSTS
router.get("/getAllPosts",(req,res)=>{

let sql ='SELECT * FROM post';
let query = db.query(sql,(err,results)=>{
if(err) {
    console.log(err);
    throw err;
}
else{

    console.log(results)
    res.send({
        statusCode:200,
        msg:"Success",
        payload:[...results]
    })
}
})

})

//GET A POST BY ID
router.get("/getPost/:id",(req,res)=>{

    let sql =`SELECT * FROM post WHERE post_id=${req.params.id}`;
    let query = db.query(sql,(err,results)=>{
    if(err) {
        console.log(err);
        throw err;
    }
    else{
    
        console.log(results)
        res.send({
            statusCode:200,
            msg:"Success",
            payload:results
        })
    }
    })
    
    })

// CREATE A POST

router.post("/createPost",(req,res)=>{
        //decide whether the author of the post is going to be compulosory
        //check if there's a name of the author in th request body, if so check if that author is already there in the author table. and if not update author tabkek or update the post_author table.



        //check for custom attributes: first decide how to get the customer attributes
})

module.exports = router;