angular.module('userControllers', [])
.controller('register-controller',function($scope,$http,$location,$timeout){
    $('#errorStatus').hide();
    this.submit=function(credentials){
        console.log("submitting");
        // console.log(this.credentials);
        var cred=this.credentials;
        
        $http.post('http://localhost:4000/api/user', cred).then(function(response) {
            $('#errorStatus').hide();            
                console.log(response.data.message);
                $timeout(function(){
                    $location.path('/');
                }, 2000);
                
            }, function(err){
                $scope.errorStatus=err.data.message;
                $('#errorStatus').show();
                console.log(err.data.message);
            });
         };
         console.log("word",$scope.errorStatus);
});