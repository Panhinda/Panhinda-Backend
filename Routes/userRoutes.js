const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
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





//LOGIN 

getUserbyUserName = async (username) => {
    let sql = `SELECT * from user WHERE username =\"${username}\" `;

    let user = new Promise((resolve, reject) => {
        let query = db.query(sql, (err, results) => {

            if (err) {
                reject({
                    statusCode: 500,
                    msg: "Error in getting user details",
                    result: err
                })

            }
            else {
                console.log("RESULTS", results)
                resolve({
                    /*  statusCode: 200,
                     msg: "getting user details ", */
                    result: results


                })
            }
        })

    })
    return user
}

router.post("/login", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;



    let getUser = await getUserbyUserName(username);

    console.log("get User", getUser)
    // let {user_id,passWord}=getUser.result[0]
    if (getUser.result[0]) {
        let { user_id, passWord } = getUser.result[0]
        if (password == passWord) {
            console.log("log in succes!")
            res.send({
                statusCode: 200,
                msg: "log in sucess!",
                result: {
                    ...getUser.result[0],
                    token: ""
                    // token should be included going forward.

                }
            })
        }
        else {

            res.send({

                statusCode: 401,
                msg: "passwords didnt match!",
            })
        }
    }
    else {

        console.log("No user found!")
        res.send({
            statusCode: 404,
            msg: "User not found!",

        })
    }



})



module.exports = router;