angular.module('admin').factory('TenantService', ['$resource', function ($resource) {
       return $resource('http://localhost:44552/api/tenants/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
       });
}]);
  

    /*function createTenant(trnObj) {

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
    }*/


 


   


   