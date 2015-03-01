var app = angular.module('admin', ['ngRoute']);

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
             //controller: 'Controller',
             templateUrl: 'app/Views/createAdmin.html'
         })
       
        .otherwise({ redirectTo: '/dashboard.html' });
});

/*app.controller('submission', function ($scope, $http, $location) {
    $scope.save = function () {
        $http({
            method: "POST",
            //url: "r",
            //data: {
            //Fornecedor: $scope.fornecedor
            //},
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data) {
            //to change the angular view use $location t0 redirect
            $location.path("#/Create/CreateTenant/CreateAdmin");
            //to redirect to page outside current angular app use 'window.location':
            //window.location = "/path-where-you-want-to-go

        }).error(function () {
            alert("Error");
        });
    };
});*/
