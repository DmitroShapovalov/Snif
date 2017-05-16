app.controller("artListController", function ($scope, $http, $location, $rootScope) {
    var that = this;
    $http.get('/api/articles')
        .then(function success(responce) {
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
