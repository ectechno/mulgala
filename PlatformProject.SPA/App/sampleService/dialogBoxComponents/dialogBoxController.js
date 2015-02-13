var dialogApp = angular.module('dialogApp', []);

dialogApp.service('dialogService', function () {
     this.isData=true;  // global variable
});

dialogApp.controller('dialogController', function ($scope, dialogService) {
    $scope.showDialogBox = function (title, value, position, backgroundColour, textColour, textAlign,callBack) {   // Show dialog box

        var dialog = document.getElementById("dialog");
        var titleBar = document.getElementById("titleBar");
        dialog.style.visibility = "visible";
        titleBar.style.visibility = "visible";
        //dialog.parentElement.style.background = '#F0F0F5';
             
        var style1 = document.createElement('style');  // For applying required styles for title bar
        style1.type = 'text/css';
        var style2 = document.createElement('style');  // For applying required styles for dialog box
        style2.type = 'text/css';
        style1.innerHTML = '.titleBar {height: 26px; width:300px; background-color:#000080; color:white}';
        style2.innerHTML = '.dialogBox {height: 100px; width:300px; border-style:solid; border-color:#B6B6B4; padding-top:14px;}';
        document.getElementsByTagName('head')[0].appendChild(style1);
        document.getElementsByTagName('head')[0].appendChild(style2);
        document.getElementById('titleBar').className = 'titleBar';
        document.getElementById('dialog').className = 'dialogBox';
                
        dialog.style.backgroundColor = backgroundColour;;
        dialog.style.color = textColour;
        dialog.style.textAlign = textAlign;
        
                
        if (position == 'right') {
            dialog.style.marginLeft = '922px';
            titleBar.style.marginLeft = '922px';
        }
        else if (position == 'left') {
            dialog.style.marginLeft = '0px';
            titleBar.style.marginLeft = '0px';
        }
        else if (position == 'center') {
            dialog.style.marginLeft = '450px';
            titleBar.style.marginLeft = '450px';
        }
        
        $scope.value = value;
        $scope.title = title;
        $scope.isData = dialogService.isData;
        return $scope.isData;
    };

    $scope.closeDialogBox = function () {
        dialogService.isData = false;
        document.getElementById("titleBar").style.visibility="hidden";
        document.getElementById("dialog").style.visibility = "hidden"
        //document.getElementById("dialog").parentElement.style.removeProperty("background");

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

dialogApp.directive('titleBar', function () {
    var directive = {};
    directive.templateUrl = "/App/sampleService/dialogBoxComponents/titleTemplate.html";
    return directive;
    
});

dialogApp.directive('dialogBox', function () {
    var directive = {};
    directive.templateUrl = "/App/sampleService/dialogBoxComponents/dialogTemplate.html";
    return directive;
});





