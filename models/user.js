const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=new Schema({
    email:{
        type:String,
        requires:true
    },
    
});
userSchema.plugin(passportLocalMongoose);//hasing+salting+hashpassword   pbkdf2 hasing algo use hoti hai

module.exports=mongoose.model('User',userSchema);