module.exports.ensureAuthenticated= function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('home', {message: "Prijavite se"})
    }