var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String
        
        
    });
    
//Add methods and features that will be used for user authorization.     
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);