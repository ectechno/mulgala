angular.module('admin').controller('tenantController', ['$scope', '$rootScope','toaster','TenantService', function ($scope, $rootScope, toaster, TenantService) {
    $scope.tenants = TenantService.query(function () {
        showNotifications();
    });

    function showNotifications() {
        if ($rootScope.created) {
            toaster.success({ title: "Tenant Creation", body: "Cretaed Successfully" });
        }
        else if ($rootScope.updated) {
            toaster.success({ title: "Tenant Modification", body: "Updated Successfully" });
        }
        else if ($rootScope.deleted) {
            toaster.success({ title: "Tenant Deletion", body: "Deleted Successfully" });
        }
    }
}]);


angular.module('admin').controller('tenantDetailController', ['$scope','$rootScope', '$routeParams','TenantService', function ($scope,$rootScope, $routeParams, TenantService) {

    $rootScope.created = false;
    $rootScope.deleted = false;
    $rootScope.updated = false;

    if (isNaN($routeParams.id)) {
        $scope.tenant = new TenantService();      // Create a new tenant
        $scope.tenant.Enable = "true";
    } else {
        $scope.tenant = TenantService.get({ id: $routeParams.id }, function () {     // Get the tenant by id
            $scope.currentTenant = $scope.tenant.tenantString;
        });
    }

    $scope.goBack = function () {
        window.location = '#/TenantManagement';
    };

    $scope.save = function () {
        $scope.tenant.User.Enable = true;
        $scope.tenant.$save(function () {
            $rootScope.created = true;
            window.location = '#/TenantManagement';
        });
    };

    $scope.update = function () {
        $scope.tenant.$update(function () {
            $rootScope.updated = true;
            window.location.hash = "#/TenantManagement";
        });
    };

    $scope.delete = function () {
        decision = confirm("Are you sure you want to delete this tenant?");
        if (decision) {
            $scope.tenant.$delete(function () {
                $rootScope.deleted = true;
                window.location.hash = "#/TenantManagement";
            });
        }
    };
      
   //helper function calls server syncronously
     
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
       
        if (tenantString) {     //if there is value, check. otherwise return
            var apiUrl = provisioningUrl + tenantString;    //if there is a value, check it with api call
            var valid = isSubdomainValid(apiUrl);
           
            if (valid == false) {  //if not valid, we donot have a tenant there
                $scope.isTenantInUse = false;   //is tenant in use = false
                return;

            } else {
                $scope.isTenantInUse = true;     //is tenant in use = true
            }
        } else {
            $scope.isTenantInUse = false;     //if scope string is undefined just return, there is not tenant
            return;
        }
    }

    $scope.checkSubdomainAvailable = function () {   // check there is a subdomain available when creating a tenant
        $scope.isTenantInUse = false;
        findTenantStrings($scope.tenant.TenantString);
    }

    $scope.checkEditSubdomainAvailable = function () { // check there is a subdomain available when creating a tenant
        $scope.isTenantInUse = false;
        if (($scope.currentTenant).toLowerCase() != ($scope.tenant.tenantString).toLowerCase()) {
            findTenantStrings($scope.tenant.tenantString);
        }
    }
}]);
