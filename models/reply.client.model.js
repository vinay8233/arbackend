const mongoose = require('mongoose')




const mongoschema = mongoose.Schema({
    Email:String,
    Sublect:String,
    Message:String,
    
})

module.exports = mongoose.model('replytoclient',mongoschema)