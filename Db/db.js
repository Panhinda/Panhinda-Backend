const mysql = require('mysql');
//const  settings = require('./settings');
var db;
<<<<<<< HEAD

console.log(process.env.DB_URL);

=======
// DO ERROR HANDLING 
>>>>>>> aw/createPost
function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(
            {
                host: process.env.DB_URL, 
                user: process.env.DB_USER,
                password: process.env.DB_AUTH, 
                database: process.env.DB_DATABASE
            
            }
        );

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
               // mysql.rec
            }
        });
    }
    return db;
}

module.exports = connectDatabase();