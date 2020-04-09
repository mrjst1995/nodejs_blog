const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
module.exports.connection=mongoose.connect('mongodb://localhost:27017/Blog', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', function () {
    console.error('radi');
});