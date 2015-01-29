var app = angular.module('admin', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/Dashboard', {
            //controller: 'Controller',
            templateUrl: 'app/Views/dashboard.html'
        })
        .when('/Create', {
            //controller: 'Controller',
            templateUrl: 'app/Views/create.html'
        })
         .when('/Widgets', {
             //controller: 'Controller',
             templateUrl: 'app/Views/widgets.html'
         })
        .when('/Licensing', {
            //controller: 'Controller',
            templateUrl: 'app/Views/licensing.html'
        })
        .when('/Statistics', {
            //controller: 'Controller',
            templateUrl: 'app/Views/statistics.html'
        })
         .when('/Create/CreateTenant', {
             //controller: 'Controller',
             templateUrl: 'app/Views/createTenant.html'
         })
        .when('/Create/CreateUser', {
            //controller: 'Controller',
            templateUrl: 'app/Views/createUser.html'
        })
         .when('/Create/CreateTenant/CreateAdmin', {
             //controller: 'Controller',
             templateUrl: 'app/Views/createAdmin.html'
         })
       
        .otherwise({ redirectTo: '/' });
});

app.controller('submission', function ($scope, $http, $location) {
    $scope.save = function () {
        $http({
            method: "POST",
            url: "Bills_Angular",
            data: {
                Fornecedor: $scope.fornecedor
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data) {
            //to change the angular view use $location t0 redirect
            $location.path("/route-where-you-want-to-go");
            //to redirect to page outside current angular app use 'window.location':
            //window.location = "/path-where-you-want-to-go

        }).error(function () {
            alert("Error");
        });
    };
});
