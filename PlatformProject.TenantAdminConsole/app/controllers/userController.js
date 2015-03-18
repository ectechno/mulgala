mainApp.controller('userController', ['$scope', '$rootScope','userService','tenantService','toaster', function ($scope, $rootScope, userService,tenantService,toaster) {
         $rootScope.tId = '';
         $rootScope.tenantUsers = [];

         $scope.tenants = tenantService.query(function () {
                for (x = 0; x < $scope.tenants.length;x++){
                    if (($rootScope.subDomain).toLowerCase() === ($scope.tenants[x].tenantString).toLowerCase()) {
                        $rootScope.tId = $scope.tenants[x].id;
                        break;
                    }
                }
         });

         $scope.users = userService.query(function () {
                count = 0;
                for (x = 0; x < $scope.users.length; x++) {
                    if ($scope.users[x].tenant!=null) {
                       if (($rootScope.subDomain).toLowerCase()===($scope.users[x].tenant).toLowerCase()) {
                            $rootScope.tenantUsers[count] = $scope.users[x];
                            count++;
                       }
                   }
                }
                showNotifications();
        });
                 
        $scope.new = function () {
            window.location = '#/users/new';
        };

        function showNotifications() {
            if ($rootScope.createdUser) {
                toaster.success({ title: "User Creation", body: "Cretaed Successfully" });
                $rootScope.createdUser = false;
            }
            else if ($rootScope.updatedUser) {
                toaster.success({ title: "User Modification", body: "Updated Successfully" });
                $rootScope.updatedUser = false;
            }
            else if ($rootScope.deletedUser) {
                toaster.success({ title: "User Deletion", body: "Deleted Successfully" });
                $rootScope.deletedUser = false;
            }
        }
     }
]);

mainApp.controller('userDetailController', ['$scope','$rootScope','$routeParams', 'userService', function ($scope,$rootScope, $routeParams, userService) {
         $rootScope.createdUser = false;
         $rootScope.deletedUser = false;
         $rootScope.updatedUser = false;

        if (isNaN($routeParams.id)) {      // Create a new item
            $scope.user = new userService();
            $scope.user.Enable = "true";
        } else {                  // Get the item by id
            $scope.user = userService.get({ id: $routeParams.id }, function () {
                $scope.currentUser = $scope.user.userName;
            });
        }
       
        $scope.goBack = function () {
            window.location = '#/users';
        };

        $scope.save = function () {
            $scope.user.TenantId = $rootScope.tId;
            $scope.user.$save(function () {
                $rootScope.createdUser = true;
                window.location.hash = '#/users';
            });
        };

        $scope.update = function () {
            $scope.user.$update(function () {
                $rootScope.updatedUser = true;
                window.location.hash = "#/users";
            });
        };

        $scope.delete = function () {
            decision = confirm("Are you sure you want to delete this user?");
            if (decision) {
                $scope.user.$delete(function () {
                    $rootScope.deletedUser = true;
                    window.location.hash = "#/users";
                });
            }
        };
    
        function findUserNames(uName) {
           for (x = 0; x < $rootScope.tenantUsers.length; x++) {
               if (($rootScope.tenantUsers[x].userName).toLowerCase() == uName.toLowerCase()) {
                   $scope.isUsernameInUse = true;
                   break;
               }
           }
        }

        $scope.isUsernameAvailable = function () {
            $scope.isUsernameInUse = false;
            findUserNames($scope.user.UserName);
        }

        $scope.isEditUsernameAvailable = function () {
            $scope.isUsernameInUse = false;
            if (($scope.currentUser).toLowerCase() != ($scope.user.userName).toLowerCase()) {
                findUserNames($scope.user.userName);
            }
        }
     }
]);