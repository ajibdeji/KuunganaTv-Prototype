angular.module('myApp', ['ngRoute', 'routeStyles'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/some/route/1', {
                templateUrl: 'partials/partial1.html',
                controller: 'Partial1Ctrl',
                css: 'css/partial1.css'
            })
            .when('/some/route/2', {
                templateUrl: 'partials/partial2.html',
                controller: 'Partial2Ctrl'
            })
            .when('/some/route/3', {
                templateUrl: 'partials/partial3.html',
                controller: 'Partial3Ctrl',
                css: ['css/partial3_1.css', 'css/partial3_2.css']
            });
        // more routes can be declared here
    }]);