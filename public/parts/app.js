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
            .when('/new/:id', {
                templateUrl: './parts/newarticle/new-article.html',
                controller: "newArtController"
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

    app.controller("artListController", function ($scope, $http, $location, $rootScope) {
        var that = this;
        $http.get('/api/articles')
            .then(function success(responce) {
                console.log(responce);
                that.post = [];
                that.post = responce.data;
            }, function error() {
                console.log("Shit heppens");
            });
        $scope.openArticle = function (artId) {
            var artPath = "/api/articles/" + artId;

            $location.path(artPath);
        };
        $scope.createNewArt = function () {
            if ($rootScope.isLogin){
            $location.path("/new");
            } else { $location.path("/login") }
        };
        this.findText = '';
        $scope.find = function () {
            var text = that.findText;
            $http.get('/find/' + text)
                .then(function success(responce) {
                    console.log(responce);
                    that.post = [];
                    that.post = responce.data.data;
                }, function error() {
                    console.log("Shit heppens");
                });
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

    app.controller("newArtController", function ($scope, multipartForm, $rootScope) {
        var name = $rootScope.userName;
        $scope.article = {};
        $scope.article.author = name;
        $scope.Submit = function() {
            var uploadUrl = '/new';
            multipartForm.newpost(uploadUrl, $scope.article);
        }

    });

    app.service('multipartForm', ['$http', function($http){
        this.newpost = function(uploadUrl, data){
            var fd = new FormData();
            for(var key in data){fd.append(key, data[key])}
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        }
    }]);

    app.controller("loginController", function ($scope, $http, $rootScope, $location) {
        $scope.username = "";
        $scope.password = "";
        $scope.dataLoading = false;

        this.login = function () {

            var data = $.param({
                name: $scope.username,
                password: $scope.password
            });

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
            $scope.dataLoading = true;

            $http.post('/users', data, config)
                .then(function success(user) {
                    if (data !==[]) {
                        $rootScope.userName = user.data.name;
                        $rootScope.isLogin = true;
                        $scope.dataLoading = false;
                        $location.path('/');
                    } else {
                        $scope.dataLoading = false;
                        alert ('Some error happened! Try enter login/password one more time!')
                    }
                },
                function error(error) {
                    console.log(error);
                    $scope.dataLoading = false;
                    alert ( "Invalid login/password! Please try again!")
                });
        }
    });

    app.controller("registrationController", function ($scope, $http, $location) {
        $scope.username = "";
        $scope.password = "";
        $scope.checkPassword = "";
        $scope.dataLoading = false;
        $scope.register = function () {

            if ($scope.password == $scope.checkPassword){
                var data = $.param({
                    name: $scope.username,
                    password: $scope.password
                });
                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                };
                $scope.dataLoading = true;
                $http.post('/users/reg', data, config)
                    .then(function success() {
                        $scope.dataLoading = false;
                        alert ('Thank you for registration!');
                        $location.path("/");
                    }, function error(data) {
                        $scope.dataLoading = false;
                        console.log(data.statusText);
                    })} else {
                alert ('Passwords don`t match. Try enter it one more time!');
                $scope.dataLoading = false;
            }
        };
    });

    app.directive("loginForm", function() {
        return {
            restrict : 'E',
            templateUrl : './parts/authentication/login-button.html',
            controller: 'loginPathController'
        };
    });

    app.controller('loginPathController', function ($scope, $location) {
        $scope.login = function () {
            $location.path('/login')
        }
    });

    app.directive("registrationForm", function() {
        return {
            restrict : 'E',
            templateUrl : './parts/registration/registration-button.html',
            controller: 'regController'
        };
    });

    app.controller('regController', function ($scope, $location) {
        $scope.registration = function () {
            $location.path('/registration')
        }
    });

    app.directive("homeButton", function() {
        return {
            restrict : 'E',
            templateUrl : './parts/topic/home-button.html',
            controller: 'homeController'
        };
    });

    app.controller('homeController', function ($scope, $location) {
        $scope.home = function () {
            $location.path('/')
        }
    });

    app.directive('hiUser', function () {
        return {
            restrict: 'E',
            templateUrl: './parts/topic/hi-user.html',
            controller: 'hiController'
        }
    });
    
    app.controller('hiController', function ($scope, $rootScope) {
        $scope.userName = $rootScope.userName || 'dear guest'
    });

    app.directive('fileModel', ['$parse', function($parse){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    })
                })
            }
        }
    }]);

