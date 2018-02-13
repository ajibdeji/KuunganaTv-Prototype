var app=angular.
module('myApp', ['ngRoute','thatisuday.dropzone','ui.bootstrap','userControllers']);

app.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
    when('/',{
        templateUrl: 'partials/main.html'
    }).
      when('/home', {
        templateUrl: 'partials/main.html'
      }).
      when('/channels', {
        templateUrl: 'partials/channelManagement.html'
      }).
      when('/media', {
        templateUrl: 'partials/mediaManagement.html'
      }).
      when('/register', {
        templateUrl: 'partials/users/register.html',
        controller:'register-controller',      
        controllerAs:'register'
      })
      .
      when('/login', {
        templateUrl: 'partials/users/login.html'
      }).
      otherwise('/');
  }
]);
app.controller('mainCtrl', function($scope,authentication ){
  var app=this;
  this.onSubmit=function(){
      // console.log(this.credentials);
      authentication
        .login(app.credentials);
        
  }

}).config(function(){console.log("in main controller")});


app.service('authentication', authentication);
authentication.$inject = ['$http', '$window'];
function authentication ($http, $window) {

  var saveToken = function (token) {
    $window.localStorage['mean-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['mean-token'];
  };

  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email : payload.email,
        name : payload.name
      };
    }
  };

  register = function(user) {
    return $http.post('/api/register', user).success(function(data){
      saveToken(data.token);
    });
  };

  login = function(user) {
    $http.post('http://localhost:4000/admin/login', user).then(function(data) {
      console.log("success");
      saveToken(data.token);
    }, function(err){
      console.log("failed",err.data.message);
    });
  };

  logout = function() {
    $window.localStorage.removeItem('mean-token');
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    register : register,
    login : login,
    logout : logout
  };
}


app.config(function(dropzoneOpsProvider){
	dropzoneOpsProvider.setOptions({
		url : '/upload',
    maxFilesize : '10',
    acceptedFiles:'image/*,video/*'
	});
});