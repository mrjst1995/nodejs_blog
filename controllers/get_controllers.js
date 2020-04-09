db_models=require('../models/schemas');
exports.home=(req,res)=>{
    db_models.Article.find({}, function(err, articles) {
        if (err) {
            console.log(err);
        } else {
            res.render('home',
                {articles: articles})
        }
    }
)};
exports.article=(req,res)=>{
    res.render('new_article');
};
exports.user=(req,res)=>{
    db_models.Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        } else {
            res.render('user', {
                articles: articles
            });
        }
    });
};
exports.sign_out=(req, res) => {
    req.logout();
    res.redirect('/');
}
exports.all_articles=(req,res)=>{
    db_models.Article.find({author: req.user._id}, function(err, articles){
        if(err){
            console.log(err);
        } else {
            res.render('all_articles', {
                articles: articles
            });
        }
    });
};

exports.single_article=function(req, res){
    db_models.Article.findById(req.params.id, function(err, article){
        db_models.User.findById(article.author, function(err, user){
            res.render('one_article', {
                article: article,
                author: user.username
            });
        });
    });
};

module.exports.del=function(req, res) {
    db_models.Article.findOne({_id: req.params.id}).exec(function(err,article){
        if(article){
            article.remove();
            res.redirect('/all_articles');
        }
        else{
            res.redirect('/user');
        }
    })
}
module.exports.edit=function (req,res) {
    db_models.Article.findById(req.params.id)
        .then(result => {
            if(result){
                res.render('edit',{
                    article:result
                });
            }
            else{
                res.redirect('/user');
            }
        })
        .catch(err => {
            res.redirect('/user');
        });
}
