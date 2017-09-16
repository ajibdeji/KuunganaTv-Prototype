App.controller('channel-controller', function($scope, $http) {
    $scope.postChannel = function() {
        $http({
            method: "POST",
            url: "http://localhost:4000/channels",
            data: {
                name: $scope.name,
                description: $scope.description
            }
        }).then(function(response) {
            console.log(response.data);
        }, function(response) {
            console.log(response.statusText);
        });
    }
});