app.controller("articleController", function ($scope, $http, $rootScope, $location, $cookieStore) {
        $scope.isAuthor = false;
        let art = this;
        var artUrl = $location.url();
        $http.get(artUrl)
            .then(function success(responce) {
                art.article = responce.data.data;
                art.author = responce.data.data.author;
                var name = $cookieStore.get('name');
                console.log(art.author);
                console.log(name);
                if(name == art.author){$scope.isAuthor = true;}
            }, function error(responce) {
                console.log(responce.message);
            });

        $scope.deleteArticle = function (id) {
            $http.delete(id)
                .then(function success(responce) {
                    $location.path('/');
                    alert('Post with id:' + id + " removed!");
                });
        };
        $scope.editArticle = function (id) {

            $location.path('/edit/' + id);
        }
    }

);