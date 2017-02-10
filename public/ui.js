
(function () {
    var app = angular.module('ui',[]);

    app.controller("firstController", function ($scope, $http) {
    this.post = [{"name":"test","author":"me","text":"this is text","date":"2017-01-27T17:22:09.136Z"},
        {"name":"test2","author":"me2","text":"this is text2","date":"2017-01-27T17:22:09.136Z"},
        {"name":"test3","author":"me3","text":"this is text3","date":"2017-01-27T17:22:09.136Z"}];

    $http.get('/')
        .then(function (responce) {
            $scope.post = responce;
        })
})
}());
