app.directive('hiUser', function () {
    return {
        restrict: 'E',
        templateUrl: './parts/topic/hi-user.html',
        controller: 'hiController'
    }
});

app.controller('hiController', function ($scope, $cookieStore) {
    $scope.userName = $cookieStore.get('name') || 'dear guest';
});