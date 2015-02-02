app.controller('tenantAdminController', function ($scope, UserService) {
    $scope.isNew = true;
    $scope.isFormMode = false;
    loadRecords();

    //Function to load all Tenant Admin records
    function loadRecords() {
        var promiseGet = UserService.getTenantAdmins(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Tenants = pl.data
        },
              function (errorPl) {
                  $log.error('failure loading Tenants', errorPl);
              });
    };

    $scope.save = function () {
        var tenantAdmin = {
            taId:$scope.taId,
            taName: $scope.taName,
            taEmail: $scope.taEmail,
            taRole:$scope.taRole,
            taUsername: $scope.taUsername,
            taPassword: $scope.taPassword
        };

        if ($scope.isNew) {
            var promisePost = UserService.post(tenantAdmin);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                $scope.Message = "Created Successfuly";
                console.log($scope.Message);
                $scope.clear();
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = UserService.put($scope.taId, tenantAdmin);
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
    $scope.delete = function (taId) {
        var promiseDelete = UserService.delete(taId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.taId = 0;
            $scope.taName = "";
            $scope.taEmail = "";
            $scope.taRole = "";
            $scope.taUsername = "";
            $scope.taPassword = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    //Method to Get Single tenant admin based on Id
    $scope.get = function (taId) {
        var promiseGetSingle = UserService.get(taId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.taId = res.taId;
            $scope.taName = res.taName;
            $scope.taEmail = res.taEmail;
            $scope.taRole = res.taRole;
            $scope.taUsername = res.taUsername;
            $scope.taPassword = res.taPassword;
            $scope.isNew = false;
        },
                  function (errorPl) {
                      console.log('failure loading Tenant Admin', errorPl);
                  });
    };

    $scope.clear = function () {
        $scope.isNew = true;
        $scope.taId = "";
        $scope.taName = "";
        $scope.taEmail = "";
        $scope.taRole = "";
        $scope.taUsername = "";
        $scope.taPassword = "";
    };

    $scope.edit = function (tenantAdmin) {
        $scope.isNew = false;
        $scope.taId = tenantAdmin.taId;
        $scope.taName = tenantAdmin.taName;
        $scope.taEmail = tenantAdmin.taEmail;
        $scope.taRole = tenantAdmin.taRole;
        $scope.taUsername = tenantAdmin.taUsername;
        $scope.taPassword = tenantAdmin.taPassword;
    };

    $scope.cancel = function () {
        $scope.clear();
    };

});
