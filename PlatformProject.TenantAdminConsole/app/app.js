var mainApp = angular.module('adminConsole', ['ngRoute', 'ngResource', 'ngStorage']);

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


angular.module('adminConsole').directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);