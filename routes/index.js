var express = require('express');
var router = express.Router();
var ArticleModel = require('../libs/mongoose').ArticleModel;
var log = require('../libs/log')(module);


router
    .get('/', function(req, res) {
    return ArticleModel.find(function (err, articles) {
        if (!err) {
            console.log(articles);
            return res.json(articles);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
})
    .get('/:id', function(req, res) {
        var id = req.params.id;
        return ArticleModel.findById(id, function (err, article) {
            if(!article) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                return res.send({ status: 'OK', data:article });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    })
    .post('/', function(req, res) {
        var article = new ArticleModel({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            images: req.body.images
        });
        article.save(function (err) {
            if (err) return log.error('write in db error:', err.message);
        });
    })
    .put('/:id', function (req, res){
        return ArticleModel.findById(req.params.id, function (err, article) {
            if(!article) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            article.title = req.body.title;
            article.description = req.body.description;
            article.author = req.body.author;
            article.images = req.body.images;
            return article.save(function (err) {
                if (!err) {
                    log.info("article updated");
                    return res.send({ status: 'OK', article:article });
                } else {
                    if(err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                    }
                    log.error('Internal error(%d): %s',res.statusCode,err.message);
                }
            });
        });
    })

    .delete('/:id', function (req, res){
        var id = req.params.id;
        return ArticleModel.findById(id, function (err, article) {
            if(!article) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return article.remove(function (err) {
                if (!err) {
                    log.info("article removed");
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    log.error('Internal error(%d): %s',res.statusCode,err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    });



module.exports = router;
