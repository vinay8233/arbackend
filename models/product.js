const mongoose = require('mongoose')




const mongoschema = mongoose.Schema({
   
    Productname: String,
    Prise: Number,
    Disc:String,
    Img:String
           
})

module.exports = mongoose.model('product',mongoschema)