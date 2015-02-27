angular.module('admin').controller('userController', ['$scope', '$window', 'UserService', 'TenantService', 'SharedServices', function ($scope, $window, UserService, TenantService, SharedServices) {
    $scope.isEdit = false;
    $scope.isFormMode = false;
    $scope.isCreated = false;
    $scope.isEdited = false;
    $scope.isDeleted = false;
    $scope.tenantGroup = [];
    $scope.userNames = ['Administrator','User'];
      
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
            count = 0;
            for (x = 0; x < $scope.Tenants.length;x++){
                $scope.tenantGroup[x] = $scope.Tenants[x].name;
                count++;
            }

        },
              function (errorPl) {
                  $log.error('failure loading Tenants', errorPl);
              });
    };


    function findTenantId(name) {
        answer = '';
        for (x = 0; x < $scope.Tenants.length;x++){
            if ($scope.Tenants[x].name == name) {
                answer=$scope.Tenants[x].id;
                break;
            }
        }
        return answer;
    }


    function findTenantName(id) {
        answer = '';
        for (x = 0; x < $scope.Tenants.length; x++) {
            if ($scope.Tenants[x].id == id) {
                answer = $scope.Tenants[x].name;
                break;
            }
        }
        return answer;
    }


    $scope.save = function () {
        $scope.uTenant = findTenantId($scope.uSelectedTenant);

        if($scope.uSelectedRole=='Administrator'){
            $scope.uRole = 1;
        }
        else {
            $scope.uRole = 2;
        }

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
            $scope.isCreated = true;
            $scope.isEdited = false;
            $scope.isDeleted = false;
            loadRecords();
          
        } else { //Else Edit the record
            var promisePut = UserService.updateUser($scope.uId, user);
            $scope.isEdited = true;
            $scope.isCreated = false;
            $scope.isDeleted = false;
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

    };


    //Method to Delete
    $scope.delete = function (uId) {
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = true;
        var promiseDelete = UserService.removeUser(uId);
        promiseDelete.then(function (pl) {
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
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        var promiseGetSingle = UserService.getUserData(uId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.uId = res.id;
            $scope.uName = res.name;
            $scope.uEmail = res.email;
            $scope.uLogo = res.logoUrl;
            $scope.uRole = res.roleId;
            $scope.uSelectedRole = res.role;

            if(res.enable){
                $scope.uEnable = "true";
            }
            else {
                $scope.uEnable = "false";
            }
           
            $scope.uTenant = res.tenantId;
            $scope.uSelectedTenant = findTenantName(res.tenantId);
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
        $scope.isCreated = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
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
