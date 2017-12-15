var app=angular.
module('myApp', ['ngRoute','thatisuday.dropzone','ui.bootstrap']);

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
      otherwise('/');
  }
]);

app.config(function(dropzoneOpsProvider){
	dropzoneOpsProvider.setOptions({
		url : '/upload',
    maxFilesize : '10',
    acceptedFiles:'image/*,video/*'
	});
});