githubServiceApp = angular.module('githubServiceApp', []);

githubServiceApp.controller('ServiceController', ['$scope', '$timeout', 'githubService',
  function ($scope, $timeout, githubService) {
      // The same example as above, plus the $timeout service
      var timeout;
      $scope.$watch('username', function (newVal) {
          if (newVal) {
              if (timeout) $timeout.cancel(timeout);
              timeout = $timeout(function () {
                  githubService.events(newVal)
                  .success(function (data, status) {
                      $scope.events = data.data;
                  });
              }, 350);
          }
      });
  }]);