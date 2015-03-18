var app = angular.module('admin', ['ngRoute', 'ngResource', 'ngStorage', 'ngAnimate', 'toaster']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/Views/dashboard/dashboard.html'
         })
        .when('/Dashboard', {
            templateUrl: 'app/Views/dashboard/dashboard.html'
        })
        .when('/TenantManagement', {
            controller: 'tenantController',
            templateUrl: 'app/Views/tenants/tenantManagement.html'
        })
        .when('/TenantManagement/CreateTenant', {
            controller: 'tenantDetailController',
            templateUrl: 'app/Views/tenants/createTenant.html'
         })
        .when('/TenantManagement/:id', {
           controller: 'tenantDetailController',
           templateUrl: 'app/Views/tenants/viewTenant.html'
        })
        .when('/UserManagement', {
           controller: 'userController',
           templateUrl: 'app/Views/users/userManagement.html'
        })
        .when('/UserManagement/CreateUser', {
           controller: 'userDetailController',
           templateUrl: 'app/Views/users/createUser.html'
        })
        .when('/UserManagement/:id', {
             controller: 'userDetailController',
             templateUrl: 'app/Views/users/viewUser.html'
        })
        .when('/Logs', {
             //controller: 'Controller',
             templateUrl: 'app/Views/logs.html'
         })
        .when('/Profile', {
           controller: '',
           templateUrl: 'app/Views/dashboard/profile.html'
         })
        .otherwise({ redirectTo: '/dashboard.html' });
});

