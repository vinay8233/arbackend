const mongoose = require('mongoose')




const mongoschema = mongoose.Schema({
    Name:String,
})

module.exports = mongoose.model('interior_categry',mongoschema)