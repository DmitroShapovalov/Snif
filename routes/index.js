'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var ArticleModel = require('../libs/mongoose').ArticleModel;
var log = require('../libs/log')(module);
var multer  = require('multer');
var im = require('imagemagick');

var upload = multer({ dest: 'uploads/' });

router
    .get('/', function(req, res) {
    return ArticleModel.find(function (err, articles) {
        if (!err) {
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

    .get('/images/:id', function(req, res) {
        var id = req.params.id;
        fs.readFile('./public/images/' + id, function (err, image) {
            if (err) return log.error('write in db error:', err.message);
            return res.send(image);
        });
    })

    .get('/images/small/:id', function(req, res) {
        var id = req.params.id;
        fs.readFile('./public/images/small/' + id, function (err, image) {
            if (err) return log.error('write in db error:', err.message);
            return res.send(image);
        });
    })

    .get('/find/:id', function(req, res) {
        var text = req.params.id;
        return ArticleModel.find({description: { "$regex": text, "$options": "i" }}, function (err, article) {
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

    .post('/', upload.any(), function(req, res) {
            console.log(req.files);
            console.log(req.body);
        var article = new ArticleModel({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: 10
        });
        for (let i = 0; i < req.files.length; i++){

            let oldPath = './uploads/' + req.files[i].filename;
            let newPath = './public/images/' + req.files[i].filename + '.' + req.files[i].mimetype.split('/')[1];
            let smallPath = './public/images/small/' + req.files[i].filename + '.' + req.files[i].mimetype.split('/')[1];
            console.log(oldPath);
            console.log(newPath);
            console.log(smallPath);
            fs.renameSync( oldPath , newPath, function (err) {
                if ( err ) console.log('ERROR: ' + err);
            });
            im.identify(newPath, function(err, features){
                if (err) throw err;
                var options = {
                    srcPath: newPath,
                    srcData: null,
                    srcFormat: null,
                    dstPath: smallPath,
                    quality: 0.8,
                    format: 'jpg',
                    progressive: false,
                    width: 180,
                    height: 180,
                    strip: true,
                    filter: 'Lagrange',
                    sharpening: 0.2,
                    customArgs: []
                };
                im.resize(options, function(err, stdout, stderr){
                    if (err) throw err;
                    console.log('resized' + smallPath + ' to fit within 256x256px');
                });
            });

            article.imageUrl[i] = newPath;
            article.imageType[i] = req.files[i].mimetype;
            article.imageSmall[i] = smallPath;
        }
        article.save(function (err) {
            if (err)
            {
                return log.error('write in db error:', err.message);
            }
            else {
                return res.send('Ok')
            }
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
/*            fs.unlinkSync( article.imageSmall , function (err) {
                if (err) throw err;
                console.log("file deleted");
            });*/

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
