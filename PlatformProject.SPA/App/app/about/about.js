

/**
 * @ngdoc function
 * @name myAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myAppApp
 */
var myApp = angular.module('myWingsApp')
  .controller('AboutCtrl', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
  });
