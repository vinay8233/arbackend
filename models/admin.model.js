const mongoose = require('mongoose')




const mongoschema = mongoose.Schema({
    Email:String,
    Password:String,

    
})

module.exports = mongoose.model('admin',mongoschema)