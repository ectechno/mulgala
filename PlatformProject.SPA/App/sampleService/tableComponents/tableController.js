var tableApp = angular.module('tableApp', []);


tableApp.controller('tableController', function ($scope) {
    $scope.people = [
        {
            name: 'Niri',
            age: '20',
            sex: 'Male'
        },
        {
            name: 'Lasa',
            age: '18',
            sex: 'Male'
        }
    ];
});
   
  

dialogApp.directive('myElement', function () {
    var directive = {};
    directive.templateUrl = "/App/sampleService/tableComponents/tableTemplate.html";
    directive.scope = {
        item: '=myElement'
    };
    directive.restrict = 'EA';
   
    return directive;

});







