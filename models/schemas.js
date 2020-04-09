const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcryptjs');
const passport=require('passport');
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
});
const UserSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});




module.exports.User = mongoose.model('user', UserSchema);
module.exports.Article = mongoose.model('article', articleSchema);


UserSchema.statics.getUserByUsername=function(username, callback){
    var query={username:username};
    User.findOne(query, callback);
}
UserSchema.statics.comparePasswords=function (try_pass, hash, callback) {
    bcrypt.compare(try_pass, hash, function (err,res) {
        if (err) throw err;
        callback(null, isMach);
    });
};