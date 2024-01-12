const express = require("express")
const mysql = require("mysql2/promise")
const router = express.Router();
const mongo = require("mongoose")


router.post("/login",async (req,res) => {
    try {
        const con = mysql.createPool({
            host:"localhost",
            password:"",
            user:"root",
            database:"digitrix_notepad"
        })
        await con.getConnection();
        
        try {
            
           let useremail = req.body.email;
           let userpassword = req.body.password; 

           let [data] = await con.execute("SELECT * FROM users where email = ? AND password = ?",[useremail , userpassword])
           if (data.length == 1) {
            
                    
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