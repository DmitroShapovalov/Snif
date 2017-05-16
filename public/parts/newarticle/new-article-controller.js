app.controller("newArtController", function ($scope, multipartForm, $cookieStore, $location) {
    let name = $cookieStore.get('name');
    $scope.article = {};
    $scope.article.author = name;
    $scope.Submit = function() {
        var uploadUrl = '/new';
        multipartForm.newpost(uploadUrl, $scope.article);
        alert('Thank you for your post');
        $location.path('/');
    }
});