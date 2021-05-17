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
router.get("/getAllPosts", (req, res) => {

    let sql = 'SELECT * FROM post';
    let query = db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {

            console.log(results)
            res.send({
                statusCode: 200,
                msg: "Success",
                payload: [...results]
            })
        }
    })

})

//GET A POST BY ID
router.get("/getPost/:id", (req, res) => {

    let sql = `SELECT * FROM post WHERE post_id=${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {

            console.log(results)
            res.send({
                statusCode: 200,
                msg: "Success",
                payload: results
            })
        }
    })

})

// CREATE A POST

router.post("/createPost", (req, res) => {
    //decide whether the author of the post is going to be compulosory
    //check if there's a name of the author in th request body, if so check if that author is already there in the author table. and if not update author tabkek or update the post_author table.
    //author should be an array

    const { user_id, title, content, type, author } = req.body
    let finalRes;
    if (user_id && title && content && author) {
        let post = { user_id, title, type, content }

        let sql1 = `INSERT INTO post SET ?`

        let query = db.query(sql1, post, (err, results) => {
            if (err) {
                console.log("failed to create the post" + err)
                res.send({
                    statusCode: 500,
                    msg: "Failed to create the post",
                    error: err
                });
            }
            else {
                console.log(results)
                finalRes = results
            }


        });
        author.map(a => {

            let sql = `SELECT author_id from author WHERE author.name=\"${a}\"`

            let query = db.query(sql, (err, results) => {
                if (err) { console.log(err) }
                else {
                    //console.log(results)
                    if (results.length == 0) {
                        console.log("its a new author")
                        let sql = `INSERT INTO author(name) VALUES(\"${a}\")`
                        let query = db.query(sql, (err, results) => {
                            if (err) { console.log("err in inserting author") }
                            else { console.log(results) }
                        })
                    }
                    else {
                        //update the post_author table

                        
                    }
                }

            })

        })
    }

    res.send({
        statusCode: 200,
        msg: "success",
        results: {

        } //should return the Idof the post created
    })
    //check for custom attributes: first decide how to get the customer attributes
})


//EDIT A POST 



//DELETE A POST 

module.exports = router;