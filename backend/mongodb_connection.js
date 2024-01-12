const express = require("express")
const router = express.Router()
const mongodb = require("mongoose")

const mongourl = "mongodb://localhost:27017/"
const connectmongo = async() => {

    try {
      await mongodb.connect(mongourl , {
        useNewUrlParser:true,
        useUnifiedTopology:true
      })
      console.log("-----------Connected to MongoDB Database----------------")
        
    } catch (error) {
        console.log("error connecting MongoDB :",error.message)
    }

}




module.exports = connectmongo