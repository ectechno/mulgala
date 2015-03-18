angular.module('admin').controller('userController', ['$scope', '$rootScope', 'toaster', 'UserService', function ($scope, $rootScope, toaster, UserService) {
    $scope.users = UserService.query(function () {
        showNotifications();
    });

    function showNotifications() {
        if ($rootScope.createdUser) {
            toaster.success({ title: "User Creation", body: "Cretaed Successfully" });
        }
        else if ($rootScope.updatedUser) {
            toaster.success({ title: "User Modification", body: "Updated Successfully" });
        }
        else if ($rootScope.deletedUser) {
            toaster.success({ title: "User Deletion", body: "Deleted Successfully" });
        }
    }
}]);

angular.module('admin').controller('userDetailController', ['$scope', '$routeParams','$rootScope','UserService', 'TenantService', function ($scope, $routeParams,$rootScope, UserService, TenantService) {
        $rootScope.createdUser = false;
        $rootScope.deletedUser = false;
        $rootScope.updatedUser = false;

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
                $rootScope.createdUser = true;
                window.location.hash = '#/UserManagement';
            });
        };

        $scope.update = function () {
            $scope.user.$update(function () {
                $rootScope.updatedUser = true;
                window.location.hash = "#/UserManagement";
            });
        };

        $scope.delete = function () {
            decision = confirm("Are you sure you want to delete this user?");
            if (decision) {
                $scope.user.$delete(function () {
                    $rootScope.deletedUser = true;
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