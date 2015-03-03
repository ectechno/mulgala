angular.module('admin').controller('tenantAdminController', function ($scope, UserService,TenantService) {
   
    $scope.tenant = '';
    $scope.tenant = findTenantString();
    $scope.aRole = 1;
    $scope.isCreated = false;
   
   // findTenantString();
    loadRecords();
    

    function findTenantString() {
        url = document.URL;
        var qparts = url.split("?");
        if (qparts.length == 0) {
            return "";
        }
        var query = qparts[1];
        var variableQuery = query.split("&");
        var equalQuery = variableQuery[1].split("=");
        ans = equalQuery[1];
        return ans;
    }


    function loadRecords() {

        var promiseGet = TenantService.getTenants(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Tenants = pl.data;
        },
              function (errorPl) {
                  console.log.error('failure loading Tenants', errorPl);
              });
    };


    function findTenantId(name) {
        answer = '';
        for (x = 0; x < $scope.Tenants.length; x++) {
            if ($scope.Tenants[x].name == name) {
                answer = $scope.Tenants[x].id;
                break;
            }
        }
       return answer;
    }

    $scope.save = function () {
        $scope.aTenant = findTenantId($scope.tenant);
        var tenantAdmin = {
            uId: $scope.aId,
            uName: $scope.aName,
            uEmail: $scope.aEmail,
            uLogo: $scope.aLogo,
            uRole: $scope.aRole,
            uTenant: $scope.aTenant,
            username: $scope.username,
            uPassword: $scope.aPassword,
            uEnable: $scope.aEnable
        };

        var promisePost = UserService.createUser(tenantAdmin);
        $scope.isCreated = true;
        window.location.href = "http://localhost:40838/index.html?#/TenantManagement";
    }

    $scope.cancel = function () {
        window.location.href = "http://localhost:40838/index.html?#/TenantManagement";
    }
});
