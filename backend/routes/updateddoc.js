const express = require("express")
const router = express.Router()
const mongo = require("mongoose")

function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

router.post("/updatedoc",async(req, res) => {

    try {
        let email = req.body.email
        let docname = req.body.docname
        let content = req.body.content
        let date = getTodayDate()

        let mydb = await mongo.connection.useDb("digitrix_notepad")
        let data = await mydb.collection("docdata").findOne(
            {email:email,
            "docs.docname":docname}
        )
        if(data)
        {
            await mydb.collection("docdata").updateOne(
                {email:email,
                "docs.docname":docname},
                {$set : {
                    "docs.$.content":content,
                    "docs.$.date":date
                }}
            )
        }
        else
        {
            await mydb.collection("docdata").updateOne(
                {email:email},
                {$addToSet : {
                    docs : {
                        docname : docname,
                        content : content,
                        date:date
                    }
                }}
            )
        }

        let userdata = await mydb.collection("docdata").findOne({
            email:email 
        })

        let docdata = await userdata.docs.find(doc => doc.docname === docname)
        let message ;

        if(docdata.version)
        {
            if (docdata.version.find(version => version.date === date)) {
                message = "yes"
            } else {
                message = "no"
            }
            
        }
        else
        {
            message = "no"
        }


        if(message === "yes")
        {
            await mydb.collection("docdata").updateOne({
                email:email , 
            "docs.docname":docname,
            "docs.version.date": date
            },
            {
                $set: {
                    "docs.$[outer].version.$[inner].content": content
                }
            },
            {
                arrayFilters: [
                    { "outer.docname": docname },
                    { "inner.date": date }
                ]
            }
            )
        }
        else
        {
            await mydb.collection("docdata").updateOne({
                email:email, 
                "docs.docname":docname
            },
            {
                $addToSet: {
                    "docs.$.version" : {
                        date:date , 
                        content:content
                    }
                }
            })
        }


        res.json({success:true , message : "Data Updated"})
    } catch (error) {
        res.json({success:false , message : error.message})
    }

})

module.exports = router