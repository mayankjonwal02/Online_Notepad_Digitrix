const e = require("express");
var mysql = require("mysql")

const MySql = async () => {

    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:""
    });

    try {
        await con.connect();
        
        console.log("-------Connected to Mysql Database--------")
    } catch (error) {
        console.log("error",error.message)
    }

}

module.exports = MySql;