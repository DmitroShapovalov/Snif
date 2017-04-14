var express = require('express');
var router = express.Router();
var UserModel = require('../libs/mongoose').UserModel;
var log = require('../libs/log')(module);
var md5 = require('md5');

router
    .get('/', function(req, res, next) {
    return UserModel.find(function (err, users) {
        if (!err) {
            console.log(users);
            return res.json(users);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
})
    .post('/', function (req, res) {
        console.log(req.cookies);
        var username = req.body.name;
        var userpass = req.body.password;
        var newDate = new Date;
        var newToken = md5(username + newDate.toString() + 'token');

        UserModel.findOneAndUpdate({name: username, password: userpass}, {$set: {token: newToken} }, { new: true, $maxTimeMS: 100 }).exec(function(err, user){
            if (user){
                console.log(user);
                return function (user) {
                    res.cookie('user', user.token);
                    res.cookie('name', user.name);
                    res.send({ status: 'OK!', name: user.name})
                }(user);
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server Error' });
            }
        })
    })
    .post('/reg', function(req, res) {
        console.log("put catched");
        var newHash = md5(req.body.name + req.body.password + 'snif');
        console.log(newHash);
        var user = new UserModel({
            name: req.body.name,
            password: req.body.password,
            hash: newHash
        });
    user.save(function (err) {
        if (err)
            {
                return res.send('/reg', {
                    errors: err.errors,
                    user: user
                });
            }
        else {
            return res.send('Ok')
            }
        });
    });



module.exports = router;
