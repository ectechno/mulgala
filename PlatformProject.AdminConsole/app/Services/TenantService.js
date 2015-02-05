/// <reference path="UserService.js" />
//Created by Madushanka on 29/01/2015.

angular.module('admin').service('TenantService'['$http', '$rootScope', '$cookies', '$cookieStore', 'MessageService', 'RequestService',
    function ($http, $rootScope, $cookies, $cookieStore, MessageService,RequestService)
    {
        
        function createTenant(trnObj){

            var key = $cookies.sessionKey;
            var request;
            var params = {
                id: trnObj.id,
                name: trnObj.name,
                hostName: trnObj.hostName,
                IP: trnObj.IP,
                port: trnObj.port,
                logo: trnObj.logo,
                email: trnObj.email,
                enable: trnObj.enable,
                username: trnObj.username,
                dateTime: trnObj.dateTime
            };
            var status = RequestService.get(request, params, null);

                if (status.isSuccess)
                {
                    MessageService.showErrorMessage('Message', 'Message');
                } else if (!status.isSuccess)
                {
                    MessageService.showErrorMessage('Error Message', status.data.error);
                }
            return status;
        }
        function updateTenant(){

        }
        function removeTenant(){

        }
        function getTenantData(tenantId) {

            var key = $cookies.sessionKey;
            var request;
            var params = {
                id: tenantId
            };
            var status = RequestService.get(request, params, null);

                if (status.isSuccess)
                {
                    MessageService.showErrorMessage('Message', 'Message');
                } else if (!status.isSuccess)
                {
                    MessageService.showErrorMessage('Error Message', status.data.error);
                }
            return status;
        }

        this.createTenant = createTenant;
        this.updateTenant = updateTenant;
        this.removeTenant = removeTenant;
        this.getTenantData = getTenantData;
    }]);