/// <reference path="UserService.js" />
//Created by Madushanka on 29/01/2015.

//angular.module('admin').service('TenantService',['$http', '$rootScope', '$cookies', '$cookieStore', 'MessageService', 'RequestService',
//    function ($http, $rootScope, $cookies, $cookieStore, MessageService,RequestService)

angular.module('admin').service('TenantService', ['$http','RequestService', function ($http, RequestService)
    {
        
        function createTenant(trnObj){

            //var key = $cookies.sessionKey;
            var request = 'http://localhost:44552/api/tenants/';
            var params = {
                Id: trnObj.tId,
                Name: trnObj.Name,
                TenantString: trnObj.tString,
                LogoUrl: trnObj.tLogo,
                Enable: trnObj.tEnable,
                dateTime: trnObj.dateTime
            };
            /*var params = {
                Name: 'abc',
                TenantString: 'abc',
                LogoUrl: 'abc',
                Enable: 'abc'
            };*/
            var status = RequestService.post(request, params, null);
            //alert(status);
               /* if (status.isSuccess)
                {
                    MessageService.showErrorMessage('Message', 'Message');
                } else if (!status.isSuccess)
                {
                    MessageService.showErrorMessage('Error Message', status.data.error);
                }*/
            return status;
        }
        function getTenants() {

        }
        function updateTenant(tenantID,tenant){

        }
        function removeTenant(tenantId){

        }
        function getTenantData(tenantId) {

            //var key = $cookies.sessionKey;
            var request = 'http://localhost:44552/api/tenants/get/'+tenantId;
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