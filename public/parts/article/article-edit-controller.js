app.controller("editArtController", function ($scope, multipartForm, $cookieStore , $location) {
    let name = $cookieStore.get('name');
    let artUrl = $location.url();
    console.log(artUrl);
    $scope.article = {};
    $scope.article.author = name;
    $scope.Submit = function() {
        multipartForm.newpost(artUrl, $scope.article);
        alert('Thank you for your post');
        $location.path('/');
    }
});