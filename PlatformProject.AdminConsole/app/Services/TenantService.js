/// <reference path="UserService.js" />
//Created by Madushanka on 29/01/2015.

//angular.module('admin').service('TenantService',['$http', '$rootScope', '$cookies', '$cookieStore', 'MessageService', 'RequestService',
    //function ($http, $rootScope, $cookies, $cookieStore, MessageService,RequestService){

angular.module('admin').service('TenantService', ['$http', 'RequestService', function ($http, RequestService) {

    function createTenant(trnObj) {

        //var key = $cookies.sessionKey;
        var request = 'http://localhost:44552/api/tenants/';
        var params = {
            "Id": 0,
            "TenantString": trnObj.tString,
            "Name": trnObj.Name,
            "LogoUrl": trnObj.tLogo,
            "Enable": trnObj.tEnable,
            "User": {
                "Name": trnObj.uName,
                "UserName": trnObj.username,
                "Email": trnObj.uEmail,
                "Password": trnObj.uPassword,
                "LogoUrl": trnObj.uLogo,
                "Enable": trnObj.uEnable
            }
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
        var request = 'http://localhost:44552/api/tenants/' + tenant.etId;
        var params = {
            "Id": tenant.etId,
            "TenantString": tenant.etString,
            "Name": tenant.eName,
            "LogoUrl": tenant.etLogo,
            "Enable": tenant.etEnable
        };
        var status = RequestService.put(request, params);
        return status;
    }


    function removeTenant(tenantId) {
        var request = 'http://localhost:44552/api/tenants/' + tenantId;
        var status = RequestService.delete(request);
        return status;
    }


    function getTenantData(tenantId) {

        //var key = $cookies.sessionKey;
        var request = 'http://localhost:44552/api/tenants/' + tenantId;
        var params = {
            id: tenantId
        };
        var header = {
            'Content-Type': 'application/json'
        };
        var status = RequestService.get(request, params, header);

        if (status.isSuccess) {
           // MessageService.showErrorMessage('Message', 'Message');
        } else if (!status.isSuccess) {
            //MessageService.showErrorMessage('Error Message', status.data.error);
        }
        return status;
    }

    this.createTenant = createTenant;
    this.updateTenant = updateTenant;
    this.removeTenant = removeTenant;
    this.getTenantData = getTenantData;
}]);