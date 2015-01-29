var app = angular.module('admin', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/Dashboard', {
            //controller: 'Controller',
            templateUrl: 'app/dashboard.html'
        })
        .when('/Create', {
            //controller: 'Controller',
            templateUrl: 'app/create.html'
        })
         .when('/Widgets', {
             //controller: 'Controller',
             templateUrl: 'app/widgets.html'
         })
        .when('/Licensing', {
            //controller: 'Controller',
            templateUrl: 'app/licensing.html'
        })
        .when('/Statistics', {
            //controller: 'Controller',
            templateUrl: 'app/statistics.html'
        })
         .when('/Create/CreateTenant', {
             //controller: 'Controller',
             templateUrl: 'app/createTenant.html'
         })
        .when('/Create/CreateUser', {
            //controller: 'Controller',
            templateUrl: 'app/createUser.html'
        })
         .when('/Create/CreateTenant/CreateAdmin', {
             //controller: 'Controller',
             templateUrl: 'app/createAdmin.html'
         })
       
        .otherwise({ redirectTo: '/' });
});
