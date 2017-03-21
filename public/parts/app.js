    var app = angular.module('app',['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider
            .when('/', {
            templateUrl: './parts/topic/topic-index.html',
            controller: "artListController"
        })
            .when('/api/articles/:id', {
                    templateUrl: './parts/article/article-open.html',
                    controller: "articleController"
                }

            )
            .when('/new', {
                templateUrl: './parts/newarticle/new-article.html',
                controller: "newArtController"
                }
            )
            .when('/new/:id', {
                templateUrl: './parts/newarticle/new-article.html',
                controller: "newArtController"
            })
    });

    app.controller("artListController", function ($scope, $http, $location) {
        var that = this;
        $http.get('/api/articles')
            .then(function success(responce) {
                that.post = [];
                that.post = responce.data;
                console.log(that.post);
            }, function error(responce) {
                console.log("Shit heppens");
            });
        $scope.openArticle = function (artId) {
            console.log(artId);
            var artPath = "/api/articles/" + artId;
            $location.path(artPath);
        };
        $scope.createNewArt = function () {
            $location.path("/new");
        }
    });

    app.controller("articleController", function ($scope, $http, $location) {
        var art = this;
        art.article = {};
        var artUrl = $location.url();
        $http.get(artUrl)
            .then(function success(responce) {
                art.article = responce.data.data;
                console.log(art.article);
            }, function error(responce) {
                console.log(responce.message);
            });
        $scope.deleteArticle = function (id) {
            $http.delete(id)
                .then(function success(responce) {
                    $location.path('/');
                    alert('Post with id:' + id + " removed!");
                });
            };
            $scope.editArticle = function (id) {

                $location.path('/new/' + id);
            }
        }

    );

    app.controller("newArtController", function ($scope, $http, $location) {
        var url = $location.url();
        var that = this;
        $http.get(url)
            .then(function success(responce) {
                that.title = responce.data.data.title;
                that.description = responce.data.data.description;
            }, function error(responce) {
                console.log(responce.message);
            });
        $scope.createNewArticle = function () {
            var data = $.param({
                title: $scope.title,
                author: "Me",
                description: $scope.description
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
            $http.post('/', data, config)
                .then(function success () {
                        console.log('article add');
                        $location.path("/");
                    },
                function error (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                    console.log($scope.ResponseDetails)
                });
        }
    });

    
/*
app.factory("workWithArticle", function ($http, $location) {
    return {
        getArticle: function () {
            var url = $location.url();
            $http.get(url)
                .then(function success(responce) {
                return responce.data.data;
            }, function error(responce) {
                return responce.message;
            });
        }
    }
});*/
