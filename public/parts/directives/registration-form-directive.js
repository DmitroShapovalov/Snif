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