//Created by Madushanka on 29/01/2015.

angular.module('admin').service('TenantService'['$http', '$rootScope', '$cookies', '$cookieStore', 'MessageService', 'RequestService',
    function ($http, $rootScope, $cookies, $cookieStore, MessageService,RequestService)
    {
        
        function createTenant(trnObj){

        }
        function updateTenant(){

        }
        function removeTenant(){

        }
        function getTenantData(tenantId) {

        }

        this.createTenant = createTenant;
        this.updateTenant = updateTenant;
        this.removeTenant = removeTenant;
        this.getTenantData = getTenantData;
    }]);