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
                        console.log($rootScope.userName);
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