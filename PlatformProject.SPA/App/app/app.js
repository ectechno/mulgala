
/**
 * @ngdoc overview
 * @name myAppApp
 * @description
 * # myAppApp
 *
 * Main module of the application.
 */
var myApp = angular
  .module('myWingsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'notifyApp',
    'validationApp'
  ])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'App/app/ajax/dashboard.html',
        })
        //.when('/plusOneDemo', {
        //    templateUrl: 'App/app/plusOneDemo/plusOneDemo.html',
        //    controller: 'plusOneDemoCtrl'
        //})

 .when('/dashboard/:url', {
     templateUrl: function (params) {
         return 'App/app/dashboard/' + params.url
     }
 })
        .when('/chart/:url', {
            templateUrl: function (params) {
                return 'App/app/charts/' + params.url
            }
        })
       .when('/table/:url', {
           templateUrl: function (params) {
               return 'App/app/tables/' + params.url
           }
       })
       .when('/form/:url', {
           templateUrl: function (params) {
               return 'App/app/forms/' + params.url
           }
       })
      .when('/uiElement/:url', {
          templateUrl: function (params) {
              return 'App/app/uiElements/' + params.url
          }
      })
      .when('/page/:url', {
          templateUrl: function (params) {
              return 'App/app/pages/' + params.url
          }
      })
      .when('/map/:url', {
          templateUrl: function (params) {
              return 'App/app/maps/' + params.url
          }
      })
    .when('/gallery/:url', {
        templateUrl: function (params) {
            return 'App/app/gallery/' + params.url
        }
    })

    .when('/typography/:url', {
        templateUrl: function (params) {
            return 'App/app/typography/' + params.url
        }
    })
     .when('/calendar/:url', {
         templateUrl: function (params) {
             return 'App/app/calendar/' + params.url
         }
     })
             //.when('/:url', {
        //    templateUrl: function (params) {
        //        return 'App/app/ajax/' + params.url + '.html'
        //    }
        //})
   .otherwise({
       redirectTo: '/'
   });
  });

var notifyApp = angular.module('notifyApp', []);
notifyApp.controller("notifyController", function ($scope) {

    $scope.show = function (data, type, position) {
        setInterval(function () {
            //if (document.getElementById("notify").style.visibility == 'hidden') {
            // document.getElementById("notify").style.visibility='visible';
            //}

            //else{
            var para = document.createElement("p");
            var node = document.createTextNode(data);
            para.appendChild(node);
            var element = document.getElementById("notify");
            element.appendChild(para);

            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.cssClass { color: white; height: 20px;width:250px; padding:20px; text-align:center';
            document.getElementsByTagName('head')[0].appendChild(style);
            document.getElementById('notify').className = 'cssClass';
            if (type == 'success') {
                element.style.backgroundColor = '#00CC00';
            }
            else if (type == 'error') {
                element.style.backgroundColor = '#E62E19';
            }
            else if (type == 'info') {
                element.style.backgroundColor = '#2368FF';
            }
            if (position == 'right') {
                element.style.marginLeft = '922px';
            }
            else if (position == 'left') {
                element.style.marginLeft = '0px';
            }
            else if (position == 'center') {
                element.style.marginLeft = '500px';
            }
            // }
        }, 1000);

    };

    $scope.hide = function () {
        //document.getElementById("notify").style.visibility='hidden';
        document.getElementById("notify").style.display = 'none';
    };

    $scope.alert = function () {
        alert('alerted!');
    };
});

var validationApp = angular.module('validationApp', []);
validationApp.controller('mainController', function ($scope) {     // create angular controller

    $scope.submitForm = function (isValid) {    // function to submit the form after all validation has occurred	
        if (isValid) {   // check to make sure the form is completely valid
            alert('Submitted Successfully');
        }
    };
});
