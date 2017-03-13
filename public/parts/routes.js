angular.module('routes')
    .config(function($routeProvider){
        $routeProvider.when('/api/articles', {
            templateUrl: 'public/parts/topic/topic-index.html'
        })
    });
