const express = require("express")
const mysql = require("mysql2/promise")
const router = express.Router()
const mongo = require('mongoose')


router.post("/signup",async(req,res) => {

    // const con = mysql.createPool({
    //     host:"localhost",
    //     password:"",
    //     user:"root",
    //     database:"digitrix_notepad"
    // })

    try {
        // await con.getConnection()
            
        try {
            let useremail = req.body.email
            let userpassword = req.body.password
            let userdb = await mongo.connection.useDb("digitrix_notepad")
            let data = await userdb.collection("digitrix_users").findOne({email:useremail})
            // let [data] = await con.execute("SELECT * FROM users WHERE email = ?",[useremail])
            // data.length == 0
            if(!data)
            {
                // let [alldata] = await con.execute("SELECT * FROM users")
                let totalemails = await userdb.collection("digitrix_users").countDocuments();
                try {
                    // await con.execute("INSERT INTO users (id , email , password) VALUES (? , ? , ?)",[alldata.length + 1 , useremail  , userpassword])
                    await userdb.collection("digitrix_users").insertOne({
                        email:useremail,
                        password:userpassword,
                        id : totalemails
                    })
                    let mydb = await mongo.connection.useDb("digitrix_notepad")
             
                    await mydb.collection("docdata").insertOne({
                                email:useremail
                            })
                    res.json({success:true , message:"Account Created"})

                } catch (error) {
                    
                    console.log(error.message)
                    res.json({success:false , message:error.message})
                }
                
            }
            else
            {
                res.json({success:false , message:"Email Already Exist"})
            }
        } catch (error) {
            console.log(error.message)
            res.json({success:false , message:error.message})
        }

    } catch (error) {
        console.log(error.message)
        res.json({success:false , message:error.message})


    }

})


router.post("/googlelogin",async(req,res) => {

    let useremail = req.body.email
    try {
        let mydb = await mongo.connection.useDb("digitrix_notepad")
 
        await mydb.collection("docdata").insertOne({
                    email:useremail
                })
        res.json({success:true , message:"Account Created"})

    } catch (error) {
        
        console.log(error.message)
        res.json({success:false , message:error.message})
    }
})


module.exports = router;