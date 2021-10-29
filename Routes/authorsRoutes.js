const express = require("express");
const router = express.Router();
const db = require('../Db/db')
// AUTHOR API GUIDE
/*
  1.Get all authors
  2.Get author by id
  3.Delete author 




*/

//GET ALL AUTHORS
router.get("/allAuthors", (req, res) => {

  let sql = 'SELECT * FROM author';
  let query = db.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      res.send({

        statusCode: 500,
        msg: "unsuccessful",
        error: err
      })
    }
    else {
      res.send({

        statusCode: 200,
        msg: "success",
        payload: [...results]
      })
    }

  })

})

//GET AUTHOR BY ID
//helper method

async function findAuthor(id) {
  //console.log("find author: " + id)
  let sql = `SELECT * FROM author WHERE author.author_id=${id}`
  let query = await new Promise((resolve,reject)=>{
    let queryRes = db.query(sql,(err, results)=>{
      if(err){
        reject({
        statusCode:500,
        msg:"failed",
        result:err,
        })
      }
      else{
        resolve({
        statusCode:200,
        msg:"success",
        result:results,
        })
      }
    })

  
})
 return query;
}

router.get("/getAuthor/:id", async (req, res) => {

//check the error handling - when the promise rejects
let result = await  findAuthor(req.params.id)
console.log(result.result.length)
if(result.result.length){
 res.send(result)
}
else{
  res.send({
    msg:"No such author exists"
  })
}


})

//DELETE AN AUTHOR
router.get("/deleteAuthor/:id",  async (req, res) => {

  
let existAuthor = await findAuthor(req.params.id)
if(existAuthor.result.length){
  let sql = `DELETE * FROM author WHERE author.author_id=${req.params.id}`
  let query = db.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      res.send({
        statusCode: 500,
        msg: "unsuccessful",
        error: err
      })
    }
    else {
      //DELETE FROM THE AUTHOR_POSTS
      let sql = `DELETE * FROM post_author WHERE post_author.author_id=${req.params.author_id}`; //syntax error in sql
      let query = db.query(sql,(err,results)=>{
        if (err) {
          console.log(err)
          res.send({
            statusCode: 500,
            msg: "unsuccessful",
            error: err
          })}
          else{
            res.send({
              statusCode: 200,
              msg: "all entries of author is successfully deleted",
              payload: results
            })
          }
      })
     
    }

  })

}
else{
   res.send({
     msg:"No such author exists to delete"
   })
}
  



})


module.exports = router;