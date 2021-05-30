const mongoose = require('mongoose') ;


const contactschema = new mongoose.Schema({
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    email : {type:String,unique:true, required:true},
    telephone : {Number},
})


module.exports=mongoose.model('Contact' , contactschema)