const express = require("express")
const mysql = require("mysql2/promise")
const router = express.Router();
const mongo = require("mongoose")


router.post("/login",async (req,res) => {
    try {
        // const con = mysql.createPool({
        //     host:"localhost",
        //     password:"",
        //     user:"root",
        //     database:"digitrix_notepad"
        // })
        // await con.getConnection();

        var userdb = await mongo.connection.useDb("digitrix_notepad")
        
        try {
            
           let useremail = req.body.email;
           let userpassword = req.body.password; 

        //    let [data] = await con.execute("SELECT * FROM users where email = ? AND password = ?",[useremail , userpassword])

        let data = await userdb.collection("digitrix_users").findOne({email:useremail})
           if (data.password == userpassword) {
            
                    
            res.json({success:true , message :"Login Successful"})
           } else {
            res.json({success:false , message :'Login Failed'})
           }

        } catch (error) {
            console.log(error.message)
            res.json({success:false , message :error.message})
        }
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message :error.message})
    }
})


module.exports = router;