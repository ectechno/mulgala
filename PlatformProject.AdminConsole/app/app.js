var app = angular.module('admin', ['ngRoute','ngResource', 'ngStorage']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/Views/dashboard.html'
         })
        .when('/Dashboard', {
            templateUrl: 'app/Views/dashboard.html'
        })
        .when('/TenantManagement', {
            controller: 'tenantController',
            templateUrl: 'app/Views/tenantManagement.html'
        })
        .when('/TenantManagement/CreateTenant', {
            controller: 'tenantDetailController',
            templateUrl: 'app/Views/createTenant.html'
         })
        .when('/TenantManagement/:id', {
           controller: 'tenantDetailController',
           templateUrl: 'app/Views/viewTenant.html'
        })
        .when('/UserManagement', {
           controller: 'userController',
           templateUrl: 'app/Views/userManagement.html'
        })
        .when('/UserManagement/CreateUser', {
           controller: 'userDetailController',
           templateUrl: 'app/Views/createUser.html'
        })
        .when('/UserManagement/:id', {
             controller: 'userDetailController',
             templateUrl: 'app/Views/viewUser.html'
        })
        .when('/Logs', {
             //controller: 'Controller',
             templateUrl: 'app/Views/logs.html'
         })
        .when('/Profile', {
           controller: '',
           templateUrl: 'app/Views/profile.html'
         })
        .otherwise({ redirectTo: '/dashboard.html' });
});

