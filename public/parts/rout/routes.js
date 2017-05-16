var app = angular.module('app',['ngRoute', 'ngCookies']);

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
        .when('/edit/:id', {
            templateUrl: './parts/article/edit-article.html',
            controller: "editArtController"
        })
        .when('/login', {
            templateUrl: './parts/authentication/authentication-form.html',
            controller: "loginController",
            controllerAs: "log"
        })
        .when('/registration', {
            templateUrl: './parts/registration/registration-form.html',
            controller: "registrationController",
            controllerAs: "reg"
        })
        .otherwise({ redirectTo: '/' });
});

app.run(function ($rootScope) {
    $rootScope.isLogin = false;
});