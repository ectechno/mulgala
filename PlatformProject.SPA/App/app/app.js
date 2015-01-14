
/**
 * @ngdoc overview
 * @name myAppApp
 * @description
 * # myAppApp
 *
 * Main module of the application.
 */
var myApp = angular
  .module('myWingsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'App/app/ajax/dashboard.html',
        })
        .when('/about', {
            templateUrl: 'App/app/about/about.html',
            controller: 'AboutCtrl'
        })
        .when('/plusOneDemo', {
            templateUrl: 'App/app/plusOneDemo/plusOneDemo.html',
            controller: 'plusOneDemoCtrl'
        })
        .when('/toastrDemo', {
            templateUrl: 'App/app/toastrDemo/toastrDemo.html',
            controller: 'toastrDemoCtrl'
        })
        .when('/validationDemo', {
            templateUrl: 'App/app/validationDemo/validationDemo.html',
            controller: 'validationDemoCtrl'
        })
        .when('/ajax/:url', {
            templateUrl: function(params){
                return 'App/app/ajax/' + params.url
            }
        })
        .when('/:url', {
            templateUrl: function(params){
                return 'App/app/ajax/' + params.url + '.html'
            }
        })
        .otherwise({
            redirectTo: '/'
        });
  });


var validationApp = angular.module('validationApp', []);
validationApp.controller('mainController', function($scope) {     // create angular controller

	$scope.submitForm = function(isValid) {    // function to submit the form after all validation has occurred	
		if (isValid) {   // check to make sure the form is completely valid
			alert('Submitted Successfully');
		}
	};
});
