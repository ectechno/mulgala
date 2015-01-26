var dialogApp = angular.module('dialogApp', []);

dialogApp.service('dialogService', function () {
     this.isData=true;  // global variable
});

dialogApp.controller('dialogController', function ($scope, dialogService) {
    $scope.showDialogBox = function (value, position, backgroundColour, textColour, textAlign) {   // Show dialog box

        var style = document.createElement('style');  // Applying required styles for dialog box
        style.type = 'text/css';
        style.innerHTML = '.cssClass {height: 100px;width:200px; border-style:double';
        document.getElementsByTagName('head')[0].appendChild(style);
        document.getElementById('dialog').className = 'cssClass';

        var element = document.getElementById("dialog");
        element.style.backgroundColor = backgroundColour;
        element.style.color = textColour;
        element.style.textAlign = textAlign;

        if (position == 'right') {
            element.style.marginLeft = '922px';
        }
        else if (position == 'left') {
            element.style.marginLeft = '0px';
        }
        else if (position == 'center') {
            element.style.marginLeft = '500px';
        }

        $scope.value = value;
        $scope.isData = dialogService.isData;
        return $scope.isData;
    };

    $scope.showAlert = function (value) {    // Show alert
        window.alert(value);
    };

    $scope.showPrompt = function (value) {   // Show prompt
        window.prompt(value);
    }

    $scope.showConfirm = function (value) {  // Show confirm
        window.confirm(value);
    }
});




