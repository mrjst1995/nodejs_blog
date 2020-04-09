var db_models=require('../models/schemas');
var bcrypt=require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// const { forwardAuthenticated } = require('../config/auth');
// const { ensureAuthenticated } = require('../config/auth');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;


module.exports.register=(req,res,next) =>{
    var username=req.body.username;
    var email=req.body.email;
    var password=bcrypt.hashSync(req.body.password,salt);

    new db_models.User({
        username: username,
        email: email,
        password: password
    }).save().then(
        res.redirect('/'))
        .catch(next)
};

module.exports.sign_in=(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/new_article',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
};
module.exports.new_article=(req,res,next)=>{
    let article = new db_models.Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;
    console.log(req.body.toString());
    article.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/user');
        }
    });
};

module.exports.edit=(req, res) => {
    db_models.Article.findById(req.params.id)
        .then(result => {
            if(result){
                result.title = req.body.title;
                result.body = req.body.body;
                return result.save();
            }
            else{
                console.log(err);
                res.redirect('/users');
            }
        })
        .then(update => {
            res.redirect('/all_articles');
        })
        .catch(err => {
            res.redirect('/user');
        });
}