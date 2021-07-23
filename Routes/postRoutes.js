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

async function getAllPosts() {

    //this functions retun type is promise

    //If the return value is not explicitly a promise, it will be implicitly wrapped in a promise.

    let sql = 'SELECT * FROM post';
    let query = await new Promise((resolve, reject) => {

        let queryRes = db.query(sql, (err, results) => {

            if (err) {
                reject({
                    statusCode: 500,
                    msg: "failed",
                    result: err
                })
            }
            else {
                resolve({
                    statusCode: 200,
                    msg: "Success",
                    payload: results
                })
            }
        })

    })

    return query;
}

router.get("/getAllPosts", async (req, res) => {

    console.log("This is get All posts")

    try {
        let result = await getAllPosts()
        console.log("result", result)
        if (result.statusCode == 200) {
            res.send(result)
        }

    }
    catch (err) {
        console.log("error")
        console.log(err)
        //res.send(err)
    }


})

//GET A POST BY ID

async function getPostById(id) {

    let sql = `SELECT * FROM post WHERE post_id=${id}`;
    let query = await new Promise((resolve, reject) => {
        let queryRes = db.query(sql, (err, results) => {
            if (err) {
                reject({
                    statusCode: 500,
                    msg: "failed",
                    result: err
                })
            }
            else {
                resolve({
                    statusCode: 200,
                    msg: "success",
                    result: results
                })
            }

        })

    })

    return query

}

async function getAuthor(postId) {


    let sql = `SELECT * FROM author WHERE author_id IN (SELECT author_id FROM post_author  WHERE post_id =${postId})`;
    let query = await new Promise((resolve, reject) => {

        let queryRes = db.query(sql, (err, results) => {

            if (err) {
                reject({
                    statusCode: 500,
                    msg: "Error in sql code of getting author_id for post",
                    result: err
                })
            }
            else {

                resolve({
                    statusCode: 200,
                    msg: "Getting author_id for post: Successful",
                    result: results
                })

            }


        })



    })

    return query
}

async function getCustomAttributes(post_id) {
    //get the custom attribute items
    let sql = `(SELECT * from custom_attribute WHERE customAttribute_Id IN (SELECT customAttribute_Id FROM post_customattribute WHERE post_id=${post_id}))`

    let customAttr = await new Promise((resolve, reject) => {

        let query = db.query(sql, (err, results) => {
            if (err) {
                reject({
                    statusCode: 500,
                    msg: "Error in getting author_id for post",
                    result: err
                })
            }
            else {
                console.log("Nethmee nested SQL", results)
                resolve({
                    statusCode: 200,
                    msg: "getting custom attribute ids  for the  post ",
                    result: results
                })
            }


        })



    })

    //console.log(" SIZE CUSTOM ATTRIBUTES:",customAttr)

    return customAttr
}


router.get("/getPost/:id", async (req, res) => {

    console.log("Get Post By Id")

    try {
        let post = await getPostById(req.params.id)
        post_id = post.result[0].post_id

        //get the author id from post_Author

        let authors = await getAuthor(post_id)
        

        let customAttributes = await getCustomAttributes(post_id)

          if(post.statusCode==200 && authors.statusCode==200 && customAttributes.statusCode==200){
              console.log(" status code 3")
              data = { ...post.result[0], author: authors.result, customAttributes: customAttributes.result }
        console.log("data", data)

        res.send({
            status: 200,
            msg: "success",
            data: data
        })


          }

      
    }
    catch (err) {
        console.log(err)
    }

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