app.controller('userController', ['$scope', '$window', 'UserService', 'TenantService', function ($scope, $window, UserService, TenantService) {
    $scope.isEdit = false;
    $scope.isFormMode = false;
    loadRecords();
    loadTenantRecords()
    //var path = 'http://localhost:40838/index.html#/UserManagement';

    //Function to load all User records
    function loadRecords() {
        var promiseGet = UserService.getUsers(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Users = pl.data;
            $window.location.href = 'http://localhost:40838/index.html#/UserManagement';
            //SharedServices.locateToWindow('http://localhost:40838/index.html#/UserManagement');
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
            uEnable:$scope.uEnable
        };

        if ($scope.isNew) {
            var promisePost = UserService.createUser(user);
            //promisePost.then(function (pl) {
               // $scope.Id = pl.data.Id;
                $scope.Message = "Created Successfuly";
                //console.log($scope.Message);
                $scope.clear();
                loadRecords();
          //  }, function (err) {
           //     console.log("Err" + err);
          //  });
        } else { //Else Edit the record
            var promisePut = UserService.updateUser($scope.uId, user);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                $scope.clear();
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
            $scope.uEnable="";
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
            $scope.uTenant = res.tenantId;
            $scope.uEnable = res.enable;
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
    }

    $scope.cancel = function () {
        $scope.clear();
        $scope.isFormMode = false;
        $scope.isEdit = false;
        $scope.isNew = false;
    };

}]);
