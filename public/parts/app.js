    var app = angular.module('app',['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider
            .when('/', {
            templateUrl: './parts/topic/topic-index.html',
            controller: "firstController"
        })
            .when('/api/articles/:id', {
                    templateUrl: './parts/article/article-open.html',
                    controller: "articleController"
                }

            )
    });

    app.controller("firstController", function ($scope, $http, $location) {
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
                    alert('Post with id:' + id + "removed!");
                });
            }
        }

    );


    /*    var simpleDelete = function ($http) {

     var that = this;

     $http.delete('/api/articles:id')
     .then(function (responce) {
     that.post = [];
     that.post = responce.data;
     console.log(that.post);
     })
     };*/
