var express = require('express');
var router = express.Router();
var UserModel = require('../libs/mongoose').UserModel;
var log = require('../libs/log')(module);

/* GET users listing. */
router.get('/api/users', function(req, res, next) {
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
});

module.exports = router;
