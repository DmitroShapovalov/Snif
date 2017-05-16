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