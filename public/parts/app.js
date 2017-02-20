
(function () {
    var app = angular.module('routes',['ngRoute']);


    var simpleGet = function ($http) {

        var that = this;

        $http.get('/api/articles')
            .then(function (responce) {
                that.post = [];
                that.post = responce.data;
                console.log(that.post);
            })
    };

    var simpleDelete = function ($http) {

        var that = this;

        $http.delete('/api/articles:id')
            .then(function (responce) {
                that.post = [];
                that.post = responce.data;
                console.log(that.post);
            })
    };

    app.controller("firstController", simpleGet);


}());
