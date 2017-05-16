app.service('multipartForm', ['$http', function($http){
    this.newpost = function(uploadUrl, data){
        var fd = new FormData();
        for(let key in data){fd.append(key, data[key])}
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
}]);