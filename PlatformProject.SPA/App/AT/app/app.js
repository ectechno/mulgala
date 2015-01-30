var app = angular.module('admin', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/Dashboard', {
            //controller: 'Controller',
            templateUrl: 'app/Views/dashboard.html'
        })
        .when('/TenantManagement', {
            //controller: 'Controller',
            templateUrl: 'app/Views/tenantManagement.html'
        })
        .when('/UserManagement', {
             //controller: 'Controller',
             templateUrl: 'app/Views/userManagement.html'
         })
        .when('/Licensing', {
            //controller: 'Controller',
            templateUrl: 'app/Views/licensing.html'
        })
        .when('/Logs', {
             //controller: 'Controller',
             templateUrl: 'app/Views/logs.html'
         })
        .when('/Statistics', {
            //controller: 'Controller',
            templateUrl: 'app/Views/statistics.html'
        })
        .when('/SystemHealth', {
            //controller: 'Controller',
            templateUrl: 'app/Views/systemHealth.html'
        })
        .when('/DarkLaunching', {
            //controller: 'Controller',
            templateUrl: 'app/Views/darkLaunching.html'
        })
        .when('/TenantManagement/CreateTenant', {
             //controller: 'Controller',
             templateUrl: 'app/Views/createTenant.html'
         })
        .when('/UserManagement/CreateUser', {
            controller: 'userController',
            templateUrl: 'app/Views/createUser.html'
        })
        .when('/TenantManagement/CreateAdmin', {
             //controller: 'Controller',
             templateUrl: 'app/Views/createAdmin.html'
         })
       
        .otherwise({ redirectTo: '/' });
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
