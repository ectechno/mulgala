mainApp.controller('userController', ['$scope', '$rootScope','userService','tenantService',
    function ($scope, $rootScope, userService,tenantService) {
            $rootScope.tId = '';
            $scope.tenantUsers = [];

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
                            $scope.tenantUsers[count] = $scope.users[x];
                            count++;
                       }
                   }
               }
                
              
        });
                 
        $scope.new = function () {
            window.location = '#/users/new';
        };
     }
]);

mainApp.controller('userDetailController', ['$scope','$rootScope','$routeParams', 'userService',
    function ($scope,$rootScope, $routeParams, userService) {

        if (isNaN($routeParams.id)) {
            // Create a new item
            $scope.user = new userService();
        } else {
            // Get the item by id
           
            $scope.user = userService.get({ id: $routeParams.id });
          
        }

        //$scope.userNames = ['Administrator', 'User'];

        $scope.edit = function (user) {
            window.location = '#/users/' + user.id + '/edit';
           
        };

        $scope.goBack = function () {
            window.location = '#/users';
        };

        $scope.save = function () {
            $scope.user.TenantId = $rootScope.tId;
          
            $scope.user.$save(function () {
                window.location.hash = '#/users';
            });
        };

        $scope.update = function () {

            $scope.user.$update(function () {
                if ($scope.user.editEnable=="true") {
                    $scope.user.enable = true;
                }
                else {
                    $scope.user.enable = false;
                }
                window.location.hash = "#/users";
            });
        };

        $scope.delete = function () {

            $scope.user.$delete(function () {
                window.location.hash = "#/users";
            });
        };
     }
]);