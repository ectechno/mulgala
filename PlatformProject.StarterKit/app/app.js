var app = angular.module('starterkit', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/Sony', {
            controller: 'loginController',
            templateUrl: 'app/Views/start.html'
        })
         .when('/Samsung', {
             controller: 'loginController',
             templateUrl: 'app/Views/start.html'
         })
         .when('/Panasonic', {
             controller: 'loginController',
             templateUrl: 'app/Views/start.html'
         })
         .when('/Toshiba', {
             controller: 'loginController',
             templateUrl: 'app/Views/start.html'
         })
         .when('/Apple', {
             controller: 'loginController',
             templateUrl: 'app/Views/start.html'
         })
        .otherwise({ redirectTo: '/' });
})