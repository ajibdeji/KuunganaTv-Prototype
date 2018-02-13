app.controller('media-controller', function($scope, $http) {
    $scope.getMedia = function() {
        $http({
            method: "GET",
            url: "http://localhost:4000/api/media",
            data: {}
        }).then(function(response) {
            $scope.allMedia=response.data.mediafiles;
            console.log($scope.allMedia);
            
        }, function(response) {
            console.log(response.statusText);
        });
    };

    $scope.removeMedia = function(id){
        $http({
            method: "DELETE",
            url: "http://localhost:4000/api/media",
            data: {
                id:id
            },
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(function(response) {
            $scope.getMedia();
            console.log($scope.allMedia);
            
        }, function(response) {
            console.log(response.statusText);
        });
    }

    $scope.showModal = function(media){
        $scope.selectedMedia=media;
        $('#partial1').modal('show');
    };

    $scope.updateMedia=function(media){
        $http({
            method: "PATCH",
            url: "http://localhost:4000/api/media",
            data: {
                id:media._id,
                name:media.name
            },
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(function(response) {
            $scope.getMedia();
            
        }, function(response) {
            console.log(response.message);
        });
    }
});