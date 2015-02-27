angular.module('admin').controller('tenantController', ['$scope', '$window', 'TenantService', function ($scope, $window, TenantService)
{
    $scope.isFormMode = false;
    $scope.isEdit = false;
    $scope.isCreated = false;
    $scope.isEdited = false;
    $scope.isDeleted = false;
    loadRecords();

   //Function to load all Tenant records
    function loadRecords() {
       
        var promiseGet = TenantService.getTenants(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Tenants = pl.data;
        },
              function (errorPl) {
                  $log.error('failure loading Tenants', errorPl);
              });
    };

    $scope.save = function () {
        var tenant = {
            tId: $scope.tId,
            Name: $scope.tName,
            tString: $scope.tString,
            tLogo: $scope.tLogo,
            tEnable: $scope.tEnable
        };
      
        if ($scope.isNew) {
         
            var promisePost = TenantService.createTenant(tenant);
            
             //promisePost.then(function (pl) {
               // $scope.Id = pl.data.Id;
               // $scope.Message = "Created Successfuly";
               // console.log($scope.Message);

            //$scope.clear();
            $scope.isCreated = true;
            $scope.isEdited = false;
            $scope.isDeleted = false;
            loadRecords();
            
                         
           //  }, function (err) {
             //    console.log("Err" + err);
            // });
        } else { //Else Edit the record
            var promisePut = TenantService.updateTenant($scope.tId, tenant);
            $scope.isEdited = true;
            $scope.isCreated = false;
            $scope.isDeleted = false;
            promisePut.then(function (pl) {
               loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

    };

    //Method to Delete
    $scope.delete = function (tId) {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = true;
        var promiseDelete = TenantService.removeTenant(tId);
        promiseDelete.then(function (pl) {
            $scope.tId = 0;
            $scope.tName = "";
            $scope.tString = "";
            $scope.tLogo = "";
            $scope.tEnable = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    //Method to Get Single tenant based on Id
    $scope.get = function (tId) {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        var promiseGetSingle = TenantService.getTenantData(tId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.tId = res.id;
            $scope.tName = res.name;
            $scope.tString = res.tenantString;
            $scope.tLogo = res.logoUrl;
            if(res.enable){
                $scope.tEnable = "true";
            }
            else {
                $scope.tEnable = "false";
            }
           // $scope.tEnable = res.enable;
            $scope.isNew = false;
        },
                  function (errorPl) {
                      console.log('failure loading Tenant', errorPl);
                  });
    };

    $scope.clear = function () {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        $scope.isNew = true;
        $scope.tId = "";
        $scope.tName = "";
        $scope.tString = "";
        $scope.tLogo = "";
        $scope.tEnable = "";
    };

    $scope.edit = function (Id) {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        $scope.isNew = false;
        $scope.isFormMode = true;
        $scope.isEdit = true;
        $scope.Message = "";
        $scope.get(Id);
    };

    $scope.createNew = function () {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        $scope.clear();
        $scope.isFormMode = true;
        $scope.isNew = true;
        $scope.Message = "";
    }

    $scope.cancel = function () {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        $scope.clear();
        $scope.isFormMode = false;
        $scope.isEdit = false;
        $scope.isNew = false;
    };

}]);
