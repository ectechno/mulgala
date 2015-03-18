var mainApp = angular.module('adminConsole', ['ngRoute', 'ngResource', 'ngStorage', 'ngAnimate', 'toaster']);

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/home', {    //Home route
            templateUrl: './app/views/home.html',
            controller: 'mainAppController'
        }).
        when('/users', {      //Item type routes
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
        otherwise({   //Default route
            redirectTo: '/home'
        });
}]);


mainApp.controller('mainAppController', function ($scope) {
});


angular.module('adminConsole').directive('pwCheck', [function () {   // Checking whether the content in Password and Confirm Password fields are same
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