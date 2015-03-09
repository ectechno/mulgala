var mainApp = angular.module('adminConsole', ['ngRoute', 'ngResource']);

mainApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.

        //Home route
        when('/home', {
            templateUrl: './app/views/home.html',
            controller: 'mainAppController'
        }).

        //Item type routes
        when('/users', {
            templateUrl: './app/views/users/listusers.html',
            controller: 'userController'
        }).
        when('/users/new', {
            templateUrl: './app/views/users/createuser.html',
            controller: 'userDetailController'
        }).
        when('/users/:id', {
            templateUrl: './app/views/users/viewuser.html',
            controller: 'userDetailController'
        }).

        //Default route
        otherwise({
            redirectTo: '/home'
        });
}]);


mainApp.controller('mainAppController', function ($scope) {


});