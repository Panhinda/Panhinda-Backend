const express = require('express');
const mysql = require("mysql");
const userRoutes = require('./Routes/userRoutes')
const postRoutes = require('./Routes/postRoutes')
const authorRoutes = require('./Routes/authorsRoutes')
const customeAttributesRoutes = require('./Routes/customeAttributesRoutes')
//create mysql connection
/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Panhinda2'
});


db.connect((err) => {
    if (err) {
        console.error("error" + err);
    }
    console.log("mysql connected");
});
*/
const app = express();
app.use(customeAttributesRoutes)
app.use(authorRoutes)
app.use(postRoutes)
app.use(userRoutes)


// create db
/* app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE  panhinda2';
     db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created!...');
    }) 
    res.send({
        status:200,
        msg:"DB Created End Point"
    })

});

// create Usertable
app.get('/createUserTable', (req, res) => {

    let sql = 'CREATE TABLE user(user_id int AUTO_INCREMENT, username VARCHAR(255),fullname VARCHAR (255),passWord VARCHAR (255), PRIMARY KEY (user_id))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(" user table sucessfully created ");
            res.send("User table created sucessfully!");
        }
    })

})

// create posts table
app.get('/createPostTable', (req, res) => {

    let sql = 'CREATE TABLE post(post_id int AUTO_INCREMENT,user_id int, title VARCHAR(255),content TEXT(65535),type VARCHAR (255), PRIMARY KEY (post_id), FOREIGN KEY (user_id) REFERENCES user(user_id))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(" post table sucessfully created ");
            res.send("post table created sucessfully!");
        }
    })

})

// create authors table
app.get('/createAuthorsTable', (req, res) => {

    let sql = 'CREATE TABLE author(author_id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (author_id))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(" Authors table sucessfully created ");
            res.send("Authors  table created sucessfully!");
        }
    })

})

// create post_author table
app.get('/createPostAuthorTable', (req, res) => {

    let sql = 'CREATE TABLE post_author(post_id int ,author_id int, CONSTRAINT PK_post_author PRIMARY KEY (post_id,author_id),FOREIGN KEY (post_id) REFERENCES post(post_id),FOREIGN KEY (author_id) REFERENCES author(author_id))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(" post author  table sucessfully created ");
            res.send("post author table created sucessfully!");
        }
    })

})

// create custom attribute 
app.get('/createCustomAttributeTable', (req, res) => {

    let sql = 'CREATE TABLE custom_attribute(customAttribute_Id int AUTO_INCREMENT, key_id int ,value_id int, PRIMARY KEY (customAttribute_Id))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(" post author  table sucessfully created ");
            res.send("post author table created sucessfully!");
        }
    })

})

//post_ custom attribute table
app.get('/createPostCustomAttributesTable', (req, res) => {

    let sql = 'CREATE TABLE post_customAttribute(post_id int ,customAttribute_Id int, CONSTRAINT PK_post_author PRIMARY KEY (post_id, customAttribute_Id),FOREIGN KEY (post_id) REFERENCES post(post_id), FOREIGN KEY (customAttribute_Id) REFERENCES custom_attribute(customAttribute_Id))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(" post custom attribute  table sucessfully created ");
            res.send("post custom attribute table created sucessfully!");
        }
    })

})
 */



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

