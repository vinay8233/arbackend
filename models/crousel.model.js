const mongoose = require('mongoose');
const productSchema = mongoose.Schema({ 
    
    
    img:{
        type:String,
        required:true,
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }
    
});
module.exports = mongoose.model('crouselproduct', productSchema);