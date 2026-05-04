const mysql = require("mysql2");

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "root",

    database: "leave_tracker"

});


db.connect((error)=>{

    if(error){

        console.log(error);

    }
    else{

        console.log("Database connected");

    }

});


module.exports = db;