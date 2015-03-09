mainApp.factory('userService', ['$resource', function ($resource) {

    return $resource('http://localhost:44552/api/users/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });

}]);