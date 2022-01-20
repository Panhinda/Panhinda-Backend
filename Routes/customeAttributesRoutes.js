const express = require("express");
const router = express.Router();
const db = require('../Db/db')

router.get("/customAttributesTest1", (req, res) => {
    res.send({
        statusCode: 200,
        msg: " custom attributes test 01 success"

    })
})


module.exports = router;


//getALl keys

getAllKeys = async () => {

    let sql = 'SELECT key_value FROM custom_attribute';

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

router.get("/getAllKeys", async (req, res) => {

    data = await getAllKeys()
    res.send({
        statusCode: 200,
        data,
        msg: " custom attributes get all keys success"

    })
})



valuesByKey = async (key) => {

    let sql = `SELECT value from custom_attribute WHERE key_value="${key}"`;

    let query = await new Promise((resolve, reject) => {


        let queryRes = db.query(sql, (err, results) => {

            if (err) {
                reject({
                    statusCode: 500,
                    msg: "Error in getting values for your key",
                    result: err
                })

            }
            else {
                resolve({
                    statusCode: 200,
                    msg: "success!",
                    result: results
                }

                )

            }


        })
       // console.log("value of query res in CA",query)
      


    })


    return query;

}


//get all values when the key is given


router.get("/getValuesByKey/:key", async (req, res) => {

    try{
        data = await valuesByKey(req.params.key)
        console.log("value of custom Attr in router",data)
        res.send({
            statusCode: 200,
            data,
            msg: " custom attributes get all keys success"
    
        })

    }
    catch(e){
        res.send(e)
    }
   
})

//get the custom attribute primary keys when the post id is present.

getCustomAttributesList = async (postId)=>{

// get a list of CA attribute primary keys ---> postCA table

let sql = `SELECT customAttribute_Id from post_customattribute WHERE post_id="${postId}"`;

let query = await new Promise((resolve, reject) => {


    let queryRes = db.query(sql, (err, results) => {

        if (err) {
            reject({
                statusCode: 500,
                msg: "Error in getting customAttributeId for the post_id",
                result: err
            })

        }
        else {
            console.log("CA keys list",results[0])
            resolve({
                statusCode: 200,
                msg: "success!",
                result: results
            }

            )

        }


    })
   // console.log("value of query res in CA",query)
  


})



// access CA table as a an array of objects with key and value pairs.


}

router.get("/getCAPrimaryKeys/:postId", async (req, res) => {

    try{
        data = await getCustomAttributesList(req.params.postId)
        console.log("relevant custom attributes list",data)
        res.send({
            statusCode: 200,
            data:{},
            msg: " custom attributes get all keys success"
    
        })

    }
    catch(e){
        res.send(e)
    }
   
})







