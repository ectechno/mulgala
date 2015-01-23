myApp.service('MathService', function () {
    this.add = function (a, b) { return a + b };

    this.subtract = function (a, b) { return a - b };

    this.multiply = function (a, b) { return a * b };

    this.divide = function (a, b) { return a / b };
});

myApp.service('calculatorService', function (MathService) {

    this.square = function (a) { return MathService.multiply(a, a); };
    this.cube = function (a) { return MathService.multiply(a, MathService.multiply(a, a)); };

});

myApp.controller('calculatorController', function ($scope, calculatorService) {

    $scope.doSquare = function () {
        $scope.answer = calculatorService.square($scope.number);
    }

    $scope.doCube = function () {
        $scope.answer = calculatorService.cube($scope.number);
    }
});

