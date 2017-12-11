var app=angular.
module('myApp', ['ngRoute']).
config(['$locationProvider', '$routeProvider',
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
      otherwise('/');
  }
]);