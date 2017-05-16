app.directive("loginForm", function() {
    return {
        restrict : 'E',
        templateUrl : './parts/authentication/login-button.html',
        controller: 'loginPathController'
    };
});

app.controller('loginPathController', function ($scope, $location, $cookieStore, $rootScope, $http) {
    $scope.login = function () {
        $location.path('/login')
    };
    $scope.vkLogin = function () {
        VK.Auth.login(function (obj) {
            $cookieStore.put('name', obj.session.user.first_name + " " + obj.session.user.last_name);
            $cookieStore.put('user', obj.session.mid);
            $rootScope.isLogin = true;
            var data = $.param({
                name: obj.session.user.first_name + " " + obj.session.user.last_name,
                password: obj.session.user.id
            });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
            $http.post('/users/reg', data, config)
                .then(function success() {
                    console.log('new VK user add');
                }, function error(data) {
                    console.log(data.statusText);
                });
            console.log('VKlogin', obj)
        })
    }
});/**
 * Created by Dmitro on 15.04.2017.
 */
