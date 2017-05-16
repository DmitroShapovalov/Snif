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