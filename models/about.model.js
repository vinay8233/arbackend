// const mongoose = require('mongoose')




// const mongoschema = mongoose.Schema({
//     Year:String,
//     Awardsname:String,
//     Img:String,
//     Place:String,
//     Location:String,

    
// })

// module.exports = mongoose.model('awards',mongoschema)




const mongoose = require('mongoose');

const mongoschema = mongoose.Schema({
    Year: String,
    Awardsname: String, // Use consistent naming
    Img: String,
    Place: String,
    Location: String,
});

module.exports = mongoose.model('awards', mongoschema);
