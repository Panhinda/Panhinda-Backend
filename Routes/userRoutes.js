const express = require("express");
const router = express.Router();
const db = require('../Db/db')

//USER API GUIDE
/* 1. create a user
   2. update a user
   3. user login (get the username and password and match them)
   4. delete a user
   5. get all users

*/
router.get("/Usertest1", (req, res) => {
    res.send({
        statusCode: 200,
        msg: "success"

    })
})
//GET ALL USERS

router.get("/getAllUsers", (req, res) => {

    let sql = 'SELECT * FROM user';
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
// CREATE USER

module.exports = router;