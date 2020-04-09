const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const db_models = require('../models/schemas');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            db_models.User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'Ovaj mejl ne postoji' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Neispravna lozinka' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        db_models.User.findById(_id, function(err, user) {
            done(err, user);
        });
    });
};