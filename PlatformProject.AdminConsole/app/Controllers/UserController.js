angular.module('admin').controller('userController', ['$scope', '$window','$rootScope', 'UserService', function ($scope,$rootScope, $window, UserService) {
   
   
   // $scope.currentUser = '';
    
  
    $scope.users = UserService.query(function () {
        count = 0;

        for (x = 0; x < $scope.users.length; x++) {
            if ($scope.users[x].tenant != null) {
                    $rootScope.tenantUsers[count] = $scope.users[x];
                    count++;
            }
        }
    });
}]);

angular.module('admin').controller('userDetailController', ['$scope', '$routeParams', 'UserService', 'TenantService', function ($scope, $routeParams, UserService, TenantService) {
        if (isNaN($routeParams.id)) {
            $scope.user = new UserService();  // Create a new user
            $scope.user.Enable = "true";
        } else {
            $scope.user = UserService.get({ id: $routeParams.id });    // Get the user by id
        }

        $scope.tenants = TenantService.query(function () {
        });

        $scope.goBack = function () {
            window.location = '#/UserManagement';
        };

        $scope.save = function () {
            $scope.user.$save(function () {
                window.location.hash = '#/UserManagement';
            });
        };

        $scope.update = function () {
            $scope.user.$update(function () {
                window.location.hash = "#/UserManagement";
            });
        };

        $scope.delete = function () {
            $scope.user.$delete(function () {
                window.location.hash = "#/UserManagement";
            });
        };
        

        function findUserNames(tId) {
            if (tId != '') {
              for (x = 0; x < $rootScope.tenantUsers.length; x++) {
                  if ($rootScope.tenantUsers[x].tenantId == tId) {
                      if (($rootScope.tenantUsers[x].userName).toLowerCase() == ($scope.user.UserName).toLowerCase()) {
                        $scope.isUsernameInUse = true;
                        break;
                    }
                }
            }
          }
       }

       $scope.isUsernameAvailable = function () {
           $scope.isUsernameInUse = false;

        
               findUserNames($scope.user.TenantId);
          

       
         //if (($scope.currentUser).toLowerCase() != ($scope.username).toLowerCase()) {
            // findUserNames();
        // }
     
    }

}]);