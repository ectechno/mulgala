angular.module('admin').controller('tenantController', ['$scope', '$window', 'TenantService', function ($scope, $window, TenantService)
{
    $scope.isFormMode = false;
    $scope.isEdit = false;
    $scope.isCreated = false;
    $scope.isEdited = false;
    $scope.isDeleted = false;
    $scope.aEnable = true;
    loadRecords();

   //Function to load all Tenant records
    function loadRecords() {
       
        var promiseGet = TenantService.getTenants(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Tenants = pl.data;
        },
              function (errorPl) {
                  console.log('failure loading Tenants', errorPl);
              });
    };

    $scope.save = function () {
        var tenant = {
            tId: $scope.tId,    //tenant data
            Name: $scope.tName,
            tString: $scope.tString,
            tLogo: $scope.tLogo,
            tEnable: $scope.tEnable,
                      
            uName: $scope.aName,  //tenant admin data
            uEmail: $scope.aEmail,
            uLogo: $scope.aLogo,
            username: $scope.username,
            uPassword: $scope.aPassword,
            uEnable: $scope.aEnable
        };

        var editedTenant = {
            etId: $scope.etId,    //tenant data
            eName: $scope.etName,
            etString: $scope.etString,
            etLogo: $scope.etLogo,
            etEnable: $scope.etEnable,
        }
      
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
            //loadRecords();
                                     
           //  }, function (err) {
             //    console.log("Err" + err);
            // });
        } else { //Else Edit the record
            var promisePut = TenantService.updateTenant($scope.etId, editedTenant);
            $scope.isEdited = true;
            $scope.isCreated = false;
            $scope.isDeleted = false;
            promisePut.then(function (pl) {
               // loadRecords();
               // window.location.href = "http://localhost:40838/index.html/#/TenantManagement"
            }, function (err) {
                console.log("Err" + err);
            });
        }

    };

    //Method to Delete
    $scope.delete = function (tId) {
        decision = confirm("Are you sure you want to delete this tenant?");

        if (decision) {
            $scope.isCreated = false;
            $scope.isEdited = false;
            var promiseDelete = TenantService.removeTenant(tId);
            promiseDelete.then(function (pl) {
                $scope.tId = 0;
                $scope.tName = "";
                $scope.tString = "";
                $scope.tLogo = "";
                $scope.tEnable = "";
                $scope.isDeleted = true;
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

    }

    //Method to Get Single tenant based on Id
    $scope.get = function (tId) {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        var promiseGetSingle = TenantService.getTenantData(tId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.etId = res.id;
            $scope.etName = res.name;
            $scope.etString = res.tenantString;
            $scope.currentTenant = res.tenantString;
            $scope.etLogo = res.logoUrl;
            if(res.enable){
                $scope.etEnable = "true";
            }
            else {
                $scope.etEnable = "false";
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
        //$scope.isNew = true;
        $scope.tId = "";
        $scope.tName = "";
        $scope.tString = "";
        $scope.tLogo = "";
        $scope.tEnable = "";
        $scope.aName = "";
        $scope.aEmail = "";
        $scope.aLogo = "";
        $scope.username = "";
        $scope.aPassword = "";
        $scope.cPassword = "";

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
        $scope.isFormMode = true;
        $scope.isNew = true;
        $scope.isEdit = false;
        $scope.tEnable = "true";
    }

    $scope.cancel = function () {
        $scope.clear();
        $scope.createTenant.tenantName.$pristine = true;
        $scope.createTenant.tenantString.$pristine = true;
        $scope.createTenant.logo.$pristine = true;
        $scope.createTenant.name.$pristine = true;
        $scope.createTenant.email.$pristine = true;
        $scope.createTenant.alogo.$pristine = true;
        $scope.createTenant.username.$pristine = true;
        $scope.createTenant.password.$pristine = true;
        $scope.createTenant.cPassword.$pristine = true;
        $scope.editTenant.etenantName.$pristine = true;
        $scope.editTenant.etenantString.$pristine = true;
        $scope.editTenant.elogo.$pristine = true;
      
        $scope.isFormMode = false;
        $scope.isEdit = false;
        $scope.isNew = false;
        window.location.href = "http://localhost:40838/index.html?#/TenantManagement"
    };
    
    /*
     * helper function calls server syncronously
     */

    function isSubdomainValid(apiUrl) {
        
        var request = new XMLHttpRequest();
        request.open('GET', apiUrl, false);  // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) {
            console.log("Your response " + request.responseText);
            return true;
        }
        else {
            console.log("invalid subdomain");
            return false;
        }

    }

    function findTenantStrings(tenantString) {
        var provisioningUrl = "http://localhost:44552/api/tenantdetails/";
        //if there is value, check. otherwise return
        if (tenantString) {
            //if there is a value, check it with api call
            console.log("data to check " + tenantString);
            var apiUrl = provisioningUrl + tenantString;

            var valid = isSubdomainValid(apiUrl);
            console.log("subdomain result " + valid)
            if (valid == false) {
                //if not valid, we donot have a tenant there
                //is tenant in use = false
                console.log("this is a invalid subdomain");
                $scope.isTenantInUse = false;
                return;

            } else {
                console.log("this is a valid subdomain");
                //is tenant in use = true
                $scope.isTenantInUse = true;
            }


        } else {
            //if scope string is undefined just return, there is not tenant
            $scope.isTenantInUse = false;
            return;
        }
    }


    /*
     * check there is a subdomain available
     * 
     */
    
    $scope.checkSubdomainAvailable = function () {
               
        $scope.isTenantInUse = false;

        if($scope.isNew){
            findTenantStrings($scope.tString);
        }

        if ($scope.isEdit) {
            if (($scope.currentTenant).toLowerCase() != ($scope.etString).toLowerCase()) {
                findTenantStrings($scope.etString);
            }
        }
        
    }
}]);
