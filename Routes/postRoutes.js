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

        if (post.statusCode == 200 && authors.statusCode == 200 && customAttributes.statusCode == 200) {
            console.log(" status code 3")
            data = { ...post.result[0], author: authors.result, customAttributes: customAttributes.result }
            console.log("data", data)

            res.send({
                status: 200,
                msg: "success",
                data: data
            })



        }
        else {
            res.send({
                status: 500,
                msg: "failure",
                error: "Server Error"
            })

        }


    }
    catch (err) {
        console.log(err)
    }

})

// CREATE A POST

router.post("/createPost", (req, res) => {
    console.log(req.body);
    const { user_id, title, content, type, author, customAttributes } = req.body; //add custom attributes

    if (user_id && title && content && author && type) {
        let post = { user_id, title, type, content }

        let sql1 = `INSERT INTO post SET ?`

        db.query(sql1, post, (err, results) => {
            if (err) {

                console.log("Error in create 1", err)
                res.status(502).json({
                    msg: 'Database Error!',
                    error: err

                });
            } else {

                //adding author
                let postID = results.insertId;
                let sql = `SELECT author_id from author WHERE author.name=\"${author}\"`;
                db.query(sql, (err, results) => {
                    if (err) {
                        res.status(502).json({
                            msg: 'Database Error!',
                            error: err
                        });
                    } else {
                        if (results.length == 0) {
                            let sql = `INSERT INTO author(name) VALUES(\"${author}\")`;
                            db.query(sql, (err, results) => {
                                if (err) {
                                    res.status(502).json({
                                        msg: 'Database Error!',
                                        error: err
                                    });
                                } else {
                                    let authorID = results.insertId;
                                    let sql = `INSERT INTO post_author(post_id,author_id) VALUES(\"${postID}\",\"${authorID}\")`;
                                    db.query(sql, (err, results) => {
                                        if (err) { 
                                            res.status(401).json({
                                                msg: 'Database Error!',
                                                error: err
                                            });
                                        } /* else {
                                            res.status(200).json({
                                                msg: 'Successful',
                                                success: true
                                            });
                                        } */
                                    })
                                }
                            })
                        } else {
                            let authorID = results[0].author_id;
                            let sql = `INSERT INTO post_author(post_id,author_id) VALUES(\"${postID}\",\"${authorID}\")`;
                            db.query(sql, (err, results) => {
                                if (err) {
                                    res.status(401).json({
                                        msg: 'Database Error!',
                                        error: err
                                    });
                                } /* else {
                                    res.status(200).json({
                                        msg: 'Successful',
                                        success: true
                                    });
                                } */
                            })
                        }


                    }
                })

                //adding custom attributes
                let custom = [{
                    key_value: "country",
                    value: "India"
                },
                {
                    key_value: "language",
                    value: "Hindi"
                },

                ]

                sql = `INSERT INTO custom_attribute (key_value,value) VALUES `
                custom.forEach((obj,indx)=>{
                          
                    if(indx === custom.length-1){
                        sql= sql+`(\"${obj.key_value}\",\"${obj.value}\");`
                        
                    }
                    else{
                        sql= sql+`(\"${obj.key_value}\",\"${obj.value}\"),`
                    }

                })
             
                db.query(sql, (err, results) => {
                    if (err) {
                        //console.log(err)
                        res.status(401).json({
                            msg: 'Database Error!',
                            error: err
                        });
                    } else {
                        //console.log("CA",results)
                        const newId1 = results.insertId;
                        const noRows =  results.affectedRows;
                        sql = `INSERT INTO post_customattribute (post_id,customAttribute_Id) VALUES `
                        for(let i=0;i<noRows;i++)
                        {

                            if(i== noRows-1){
                                sql= sql+`(${postID},${newId1+i});`
                            }
                            else{
                                sql= sql+`(${postID},${newId1+i}),`
                            }
                            

                        }
                        console.log("post_ca",sql)
                        db.query(sql, (err, results) => {
                            if (err) { 
                               // console.log("Post_Ca_updated error",err);
                                res.status(401).json({
                                    msg: 'Database Error!',
                                    error: err
                                });
                            }  else {
                                //console.log("Post_Ca_updated",results);
                                res.status(200).json({
                                    msg: 'Successful',
                                    success: true
                                });
                            } 
                        })

                        /* res.status(200).json({
                            msg: 'Successful',
                            success: true
                        }); */
                    }
                })



            }
        });
    } else {
        res.status(401).json({ msg: 'All fields are required' });
        // const error = new Error('All fields are required');
        // error.statusCode = 422;
        // throw error;
    }
})


//EDIT A POST 



//DELETE A POST 

module.exports = router;