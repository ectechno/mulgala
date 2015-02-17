angular.module('admin').controller('userController', ['$scope', '$window', 'UserService', 'TenantService', 'SharedServices', function ($scope, $window, UserService, TenantService, SharedServices) {
    $scope.isEdit = false;
    $scope.isFormMode = false;
  
    $scope.userNames = [
       { code: "1", name: "Administrator" },
       { code: "2", name: "User" }
    ];
   
    $scope.enableOptions = [
       { code: "true", name: "true" },
       { code: "false", name: "false" }
    ];
  
    loadRecords();
    loadTenantRecords();
            
    //Function to load all User records
    function loadRecords() {
        var promiseGet = UserService.getUsers(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Users = pl.data;
            SharedServices.locateToWindow("http://localhost:40838/index.html#/UserManagement");
        },
              function (errorPl) {
                  $log.error('failure loading Users', errorPl);
              });
    };

    function loadTenantRecords() {

        var promiseGet = TenantService.getTenants(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Tenants = pl.data;
        },
              function (errorPl) {
                  $log.error('failure loading Tenants', errorPl);
              });
    };

    $scope.save = function () {
        var user = {
            uId: $scope.uId,
            uName: $scope.uName,
            uEmail: $scope.uEmail,
            uLogo:$scope.uLogo,
            uRole: $scope.uRole,
            uTenant: $scope.uTenant,
            username: $scope.username,
            uPassword:$scope.uPassword,
            uEnable:$scope.uEnable
        };

        if ($scope.isNew) {
            var promisePost = UserService.createUser(user);
            //promisePost.then(function (pl) {
               // $scope.Id = pl.data.Id;
                $scope.Message = "Created Successfuly";
                //console.log($scope.Message);
                //$scope.clear();
                loadRecords();
          //  }, function (err) {
           //     console.log("Err" + err);
          //  });
        } else { //Else Edit the record
            var promisePut = UserService.updateUser($scope.uId, user);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                //$scope.clear();
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

    };

    //Method to Delete
    $scope.delete = function (uId) {
        var promiseDelete = UserService.removeUser(uId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.uId = 0;
            $scope.uName = "";
            $scope.uEmail = "";
            $scope.uLogo="";
            $scope.uRole = "";
            $scope.uTenant = "";
            $scope.uEnable = "";
            $scope.username = "";
            $scope.uPassword = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    //Method to Get Single user based on Id
    $scope.get = function (uId) {
        var promiseGetSingle = UserService.getUserData(uId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.uId = res.id;
            $scope.uName = res.name;
            $scope.uEmail = res.email;
            $scope.uLogo = res.logoUrl;
            $scope.uRole = res.roleId;
            $scope.selectedRole = res.role;
            $scope.uEnable = res.enable;
            $scope.uTenant = res.tenantId;
            $scope.username = res.userName;
            $scope.uPassword = res.password;
            $scope.cPassword = res.password;
            $scope.isNew = false;
        },
                  function (errorPl) {
                      console.log('failure loading User', errorPl);
                  });
    };

    $scope.clear = function () {
        $scope.uId = "";
        $scope.uName = "";
        $scope.uEmail = "";
        $scope.uLogo = "";
        $scope.uRole = "";
        $scope.uTenant = "";
        $scope.uEnable = "";
        $scope.username = "";
        $scope.uPassword = "";
        $scope.cPassword = "";
    };

    $scope.edit = function (Id) {
        $scope.isNew = false;
        $scope.isFormMode = true;
        $scope.isEdit = true;
        $scope.Message = "";
        $scope.get(Id);
    };

    $scope.createNew = function () {
        $scope.clear();
        $scope.isFormMode = true;
        $scope.isNew = true;
        $scope.Message = "";
        $scope.uTenant = 0;
    }

    $scope.cancel = function () {
        $scope.clear();
        $scope.isFormMode = false;
        $scope.isEdit = false;
        $scope.isNew = false;
    };

}]);
