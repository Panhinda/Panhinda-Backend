const mysql = require('mysql');
const  settings = require('./settings');
var db;
// DO ERROR HANDLING 
function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(
           settings
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