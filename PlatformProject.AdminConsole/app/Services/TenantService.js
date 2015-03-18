angular.module('admin').factory('TenantService', ['$resource', function ($resource) {
       return $resource('http://localhost:44552/api/tenants/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
       });
}]);
  

  

 


   


   