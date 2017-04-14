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

var Article = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price:  { type: String },
    imageUrl: [],
    imageType: [],
    imageSmall: [],
    modified: { type: Date, default: Date.now }
});

var User = new Schema({
    name: { type: String },
    password: { type: String },
    token: { type: String, default: '' },
    hash: { type: String, required: true},
    rights: { type: String, default: 'guest' },
    date: { type: Date,  default: Date.now}
    });

var ArticleModel = mongoose.model('Article', Article);
var UserModel = mongoose.model('User', User);

module.exports.ArticleModel = ArticleModel;
module.exports.UserModel = UserModel;