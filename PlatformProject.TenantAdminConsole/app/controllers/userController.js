mainApp.controller('userController', ['$scope', 'userService',
    function ($scope, userService) {

        $scope.users = userService.query();

        $scope.new = function () {
            window.location = '#/users/new';
        };

    }
]);

mainApp.controller('userDetailController', ['$scope', '$routeParams', 'userService',
    function ($scope, $routeParams, userService) {

        if (isNaN($routeParams.id)) {
            // Create a new item
            $scope.user = new userService();
        } else {
            // Get the item by id
            $scope.user = userService.get({ id: $routeParams.id });
        }

        $scope.edit = function (user) {
            window.location = '#/users/' + user.id + '/edit';
        };

        $scope.goBack = function () {
            window.location = '#/users';
        };

        $scope.save = function () {

            $scope.user.$save(function () {
                window.location.hash = "#/users";
            });
        };

        $scope.update = function () {

            $scope.user.$update(function () {
                window.location.hash = "#/users";
            });
        };

        $scope.delete = function () {

            $scope.user.$delete(function () {
                window.location.hash = "#/users";
            });
        };

    }
]);