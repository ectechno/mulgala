app.controller('tenantController', function ($scope, TenantService) {
    $scope.isNew = true;
    $scope.isFormMode = false;
    loadRecords();

    //Function to load all Tenant records
    function loadRecords() {
        var promiseGet = TenantService.getTenants(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Tenants = pl.data
        },
              function (errorPl) {
                  $log.error('failure loading Tenants', errorPl);
              });
    };

    $scope.save = function () {
        var tenant = {
            tId: $scope.tId,
            tName: $scope.tName,
            tHost: $scope.tHost,
            tIp: $scope.tIp,
            tPort: $scope.tPort,
            tLogo:$scope.tLogo,
            tEmail: $scope.tEmail,
            tEnable:$scope.tEnable
        };

        if ($scope.isNew) {
            var promisePost = TenantService.post(tenant);
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
            var promisePut = TenantService.put($scope.tId, tenant);
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
    $scope.delete = function (tId) {
        var promiseDelete = TenantService.delete(tId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.tId = 0;
            $scope.tName = "";
            $scope.tHost = "";
            $scope.tIp = "";
            $scope.tPort = "";
            $scope.tLogo = "";
            $scope.tEmail = "";
            $scope.tEnable = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    //Method to Get Single tenant based on Id
    $scope.get = function (tId) {
        var promiseGetSingle = TenantService.get(tId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.tId = res.tId;
            $scope.tName = res.tName;
            $scope.tHost = res.tHost;
            $scope.tIp = res.tIp;
            $scope.tPort = res.tPort;
            $scope.tLogo = res.tLogo;
            $scope.tEmail = res.tEmail;
            $scope.tEnable = res.tEnable;
            $scope.isNew = false;
        },
                  function (errorPl) {
                      console.log('failure loading Tenant', errorPl);
                  });
    };

    $scope.clear = function () {
        $scope.isNew = true;
        $scope.tId = "";
        $scope.tName = "";
        $scope.tHost = "";
        $scope.tIp = "";
        $scope.tPort = "";
        $scope.tLogo = "";
        $scope.tEmail = "";
        $scope.tEnable = "";
    };

    $scope.edit = function (tenant) {
        $scope.isNew = false;
        $scope.tId = tenant.tId;
        $scope.tName = tenant.tName;
        $scope.tHost = tenant.tHost;
        $scope.tIp = tenant.tIp;
        $scope.tPort = tenant.tPort;
        $scope.tLogo = tenant.tLogo;
        $scope.tEmail = tenant.tEmail;
        $scope.tEnable = tenant.tEnable;
    };

    $scope.cancel = function () {
        $scope.clear();
    };

});
