const mongoose = require('mongoose')




const mongoschema = mongoose.Schema({
    img: String,
    Location: String,
    Category: String,
    Projectname: String,
})

module.exports = mongoose.model('interior',mongoschema)