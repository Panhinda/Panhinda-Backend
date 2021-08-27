const express = require("express");
const router = express.Router();
const db = require('../Db/db');

async function getAllPostTypes (){

let sql = "SELECT DISTINCT type FROM post";

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

        let types = results.map(item=>item['type'])  
        console.log("Types array", types)  
            resolve({
                statusCode: 200,
                msg: "Success",
                payload: types
            })
        }
    })

})

return query;


}

router.get("/getAllPostTypes", async (req, res) => {

    console.log("This is get All post types")

    try {
        let result = await getAllPostTypes()
        console.log("result", result.payload)
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


module.exports = router;







