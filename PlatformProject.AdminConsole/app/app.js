var app = angular.module('admin', ['ngRoute', 'ngStorage']);

app.config(function ($routeProvider) {
    $routeProvider
         .when('/', {
             templateUrl: 'app/Views/dashboard.html'
         })
        .when('/Dashboard', {
            //controller: 'Controller',
            templateUrl: 'app/Views/dashboard.html'
        })
        .when('/TenantManagement', {
            controller: 'tenantController',
            templateUrl: 'app/Views/tenantManagement.html'
        })
        .when('/UserManagement', {
             controller: 'userController',
             templateUrl: 'app/Views/userManagement.html'
         })
        .when('/Logs', {
             //controller: 'Controller',
             templateUrl: 'app/Views/logs.html'
         })
        .when('/UserManagement/CreateUser', {
            //controller: 'userController',
            templateUrl: 'app/Views/createUser.html'
        })
        .when('/TenantManagement/CreateAdmin', {
            controller: 'tenantAdminController',
            templateUrl: 'app/Views/createAdmin.html'
         })
        .when('/Profile', {
           controller: '',
           templateUrl: 'app/Views/profile.html'
         })
        .otherwise({ redirectTo: '/dashboard.html' });
});

