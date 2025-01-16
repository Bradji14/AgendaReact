const mysql = require("mysql");


const connection= mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    // database: "wwwsoftmasbeauty_mas23",
    database: "wwwsoftmasbeauty_masagenda",


})

module.exports=connection
