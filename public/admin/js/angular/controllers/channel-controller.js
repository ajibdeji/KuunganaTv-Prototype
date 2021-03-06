/* global app */

app.controller('channel-controller', function($scope, $http) {
    $scope.postChannel = function() {
        $http({
            method: "POST",
            url: "http://localhost:4000/api/channels",
            data: {
                name: $scope.name,
                description: $scope.description
            }
        }).then(function(response) {
            console.log(response.data);
            $scope.name="";
            $scope.description="";
            $scope.getChannels();
        }, function(response) {
            console.log(response.statusText);
        });
    };
    $scope.getChannels = function() {
        $http({
            method: "GET",
            url: "http://localhost:4000/api/channels",
            data: {}
        }).then(function(response) {
            $scope.allChannels=response.data.channels;
            console.log($scope.allChannels);
            
        }, function(response) {
            console.log(response.statusText);
        });
    };
});