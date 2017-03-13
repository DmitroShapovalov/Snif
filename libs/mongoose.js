var mongoose = require('mongoose');
var log = require('./log')(module);
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once("open", function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

var Article = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now }
});

var User = new Schema({
    name: { type: String, default: "user" },
    password: { type: String, default: "user" },
    rights: { type: String, default: "guest" },
    age: { type: Number, min: 18, index: true },
    date: { type: Date,  default: Date.now}
    });

var ArticleModel = mongoose.model('Article', Article);
var UserModel = mongoose.model('User', User);



/*var firstUser = new UserModel({ name: "Dimon", password: "1234", rights: "admin", age: 30});
firstUser.save(function (err) {
    if (err) return log.error('write in db error:', err.message);
});*/

module.exports.ArticleModel = ArticleModel;
module.exports.UserModel = UserModel;