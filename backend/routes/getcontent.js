const express = require("express")
const router = express.Router()
const mongo = require("mongoose")
const { json } = require("react-router-dom")



router.post("/getcontent", async(req,res) => {

    try {
        let email = req.body.email
        let docname = req.body.docname
        let mydb = mongo.connection.useDb("digitrix_notepad")
        let contentdata = await mydb.collection("docdata").findOne(
            {email:email })

            let docdata = contentdata.docs.find(doc => doc.docname === docname)
            if(docdata)
            {
                res.json({success:true,message:"document exist" , data:docdata.content})
            }
            else
            {
                res.json({success:true,message:"document don't exist" , data:""})
            }
            
           
    } catch (error) {
        res,json({success:false , message : error.message})
    }
})

router.post("/getdoclist", async(req,res) => {

    try {
        let email = req.body.email
        let docname = req.body.docname
        let mydb = mongo.connection.useDb("digitrix_notepad")
        let contentdata = await mydb.collection("docdata").findOne(
            {email:email })

            if(contentdata)
            {let docdata = contentdata.docs
            if(docdata)
            {
                res.json({success:true,message:"document exist" , data:contentdata})
            }
            else
            {
                res.json({success:false,message:"document don't exist" , data:[]})
            }}
            else
            {
                res.json({success:false,message:"document don't exist" , data:[]})
            }
            
           
    } catch (error) {
        res.json({success:false , message : error.message})
    }
})

router.post("/getversion", async(req,res) => {

    try {
        let email = req.body.email
        let docname = req.body.docname
        let mydb = mongo.connection.useDb("digitrix_notepad")
        let contentdata = await mydb.collection("docdata").findOne(
            {email:email })

                
            let docdata = contentdata.docs.find(doc => doc.docname === docname)
            if(docdata)
            {
                if (docdata.version) {
                    
                    res.json({success:true,message:"document exist" , data:docdata.version})
                } else {
                    res.json({success:true,message:"document don't exist" , data:[]})
                }
            }
            else
            {
                res.json({success:false,message:"document don't exist" , data:[]})
            }
      
            
           
    } catch (error) {
        res,json({success:false , message : error.message})
    }
})

module.exports = router