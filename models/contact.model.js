const mongoose = require('mongoose')




const mongoschema = mongoose.Schema({
    Name:String,
    Email:String,
    Subject:String,
    Message:String,
   
           
})

module.exports = mongoose.model('contactus',mongoschema)