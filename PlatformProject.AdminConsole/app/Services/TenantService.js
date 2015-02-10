/// <reference path="UserService.js" />
//Created by Madushanka on 29/01/2015.

//angular.module('admin').service('TenantService',['$http', '$rootScope', '$cookies', '$cookieStore', 'MessageService', 'RequestService',
//    function ($http, $rootScope, $cookies, $cookieStore, MessageService,RequestService)

angular.module('admin').service('TenantService', ['$http', 'RequestService', function ($http, RequestService) {

    function createTenant(trnObj) {

        //var key = $cookies.sessionKey;
        var request = 'http://localhost:44552/api/tenants/';
        var params = {
            "Id": 0,
            "TenantString": trnObj.tString,
            "Name": trnObj.Name,
            "LogoUrl": trnObj.tLogo,
            "Enable": trnObj.tEnable
        };

        var header = {
            'Content-Type': 'application/json'
        };
        var status = RequestService.post(request, params, header);
        return status;
    }


    this.getTenants = function () {
        var request = 'http://localhost:44552/api/tenants/';
        var params = null;
        var header = {
            'Content-Type': 'application/json'
        };
        var status = RequestService.get(request, params, header);
        return status;
    }


    function updateTenant(tenantID, tenant) {

    }


    function removeTenant(tenantId) {
        var request = 'http://localhost:44552/api/tenants/' + tenantId;
        var status = RequestService.delete(request);
        return status;
    }


    function getTenantData(tenantId) {

        //var key = $cookies.sessionKey;
        var request = 'http://localhost:44552/api/tenants/get/' + tenantId;
        var params = {
            id: tenantId
        };
        var status = RequestService.get(request, params, null);

        if (status.isSuccess) {
            MessageService.showErrorMessage('Message', 'Message');
        } else if (!status.isSuccess) {
            MessageService.showErrorMessage('Error Message', status.data.error);
        }
        return status;
    }

    this.createTenant = createTenant;
    this.updateTenant = updateTenant;
    this.removeTenant = removeTenant;
    this.getTenantData = getTenantData;
}]);