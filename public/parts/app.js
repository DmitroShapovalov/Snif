    var app = angular.module('app',['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: './parts/topic/topic-index.html',
            controller: "firstController"
        })
    });

    app.controller("firstController", function ($scope, $http) {
        var that = this;
        $http.get('/api/articles')
            .then(function success(responce) {
                that.post = [];
                that.post = responce.data;
                console.log(that.post);
            }, function error(responce) {
                console.log(response.statusText);
            })
    });


    /*    var simpleDelete = function ($http) {

     var that = this;

     $http.delete('/api/articles:id')
     .then(function (responce) {
     that.post = [];
     that.post = responce.data;
     console.log(that.post);
     })
     };*/
