var progressBarApp = angular.module("progressBarApp", []);


progressBarApp.controller("progressbarController", ['$scope', function ($scope) {
    $scope.value = 10
    $scope.items = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}])
.directive('progressbar', [function () {
    return {
        restrict: 'A',  //Atribute
        scope: {
            'progress': '=progressbar'
        },
        controller: function ($scope, $element, $attrs) {
            $element.progressbar({
                value: $scope.progress
            })

            $scope.$watch(function () {
                $element.progressbar({ value: $scope.progress })
            })
        }
    }
}])
