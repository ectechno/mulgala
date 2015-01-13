var myApp = angular.module('myWingsApp')
  .controller('validationDemoCtrl', function ($scope) {
      $scope.required="";
      if(this.required==""){
          window.alert("Please fill all required fields");
      }
  }
);
