app.controller('ServiceController', ['$scope', 'githubService',
    function ($scope, githubService) {
        // Watch for changes on the username property.
        // If there is a change, run the function
        $scope.$watch('username', function (newUsername) {
            // uses the $http service to call the GitHub API
            // and returns the resulting promise
            githubService.events(newUsername)
              .success(function (data, status, headers) {
                  // the success function wraps the response in data
                  // so we need to call data.data to fetch the raw data
                  $scope.events = data.data;
              })
        });
    }]);