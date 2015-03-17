angular.module('admin').controller('userDetailController', ['$scope', '$routeParams','UserService', 'TenantService', function ($scope, $routeParams, UserService, TenantService) {
      
        if (isNaN($routeParams.id)) {
            $scope.user = new UserService();  // Create a new user
            $scope.user.Enable = "true";
        } else {
            $scope.user = UserService.get({ id: $routeParams.id }, function () {  // Get the user by id
                $scope.currentUser = $scope.user.userName;
            });    
        }

        $scope.users = UserService.query(function () {
        });

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
            decision = confirm("Are you sure you want to delete this tenant?");
            if (decision) {
                $scope.user.$delete(function () {
                    window.location.hash = "#/UserManagement";
                });
            }
        };
                  
        function findTenantName(id) {
            answer = '';
            for (x = 0; x < $scope.tenants.length; x++) {
                if($scope.tenants[x].id==id){
                    answer = $scope.tenants[x].name;
                    break;
                }
            }
            return answer;
        }

        function findUserNames(tId,uName) {
            temp = findTenantName(tId);
            if (tId != '') {
                for (x = 0; x < $scope.users.length; x++) {
                    if ($scope.users[x].tenant != null) {
                        if ($scope.users[x].tenant == temp) {
                            if (($scope.users[x].userName).toLowerCase() == uName.toLowerCase()) {
                                $scope.isUsernameInUse = true;
                                break;
                            }
                        }
                    }
                }
            }
        }

        $scope.isUsernameAvailable = function () {
            $scope.isUsernameInUse = false;
            findUserNames($scope.user.TenantId, $scope.user.UserName);
        }

        $scope.isEditUsernameAvailable = function () {
            $scope.isUsernameInUse = false;
            if (($scope.currentUser).toLowerCase() != ($scope.user.userName).toLowerCase()) {
                findUserNames($scope.user.tenantId, $scope.user.userName);
            }
        }
}]);