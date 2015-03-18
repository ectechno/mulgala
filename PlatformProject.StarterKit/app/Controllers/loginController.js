var app = angular.module('starterkit', ["ngStorage"]);

app.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                //alert('image is loaded');
            });
        }
    };
});

app.controller('loginController', function ($scope, $window, loginService, $localStorage) {
    $scope.isLogged = false;
    $scope.isAdmin = false;
    $scope.isUser = false;
    $scope.obj = [];
    $scope.uri = '';
    $scope.AccessToken = '';
    
    /* function to check if there is a
      local token available
    */

    function isLocalTokenAvailable() {
        var token = $localStorage.token;
        if (typeof token == 'undefined') {
            return false;      //then there is no token
        }else{
            return true;      //there is a token
        }
    }
       
    var full = window.location.host;    //get the subdomain from url
    var parts = full.split('.');
    var sub = parts[0];
    $scope.subDomain = sub;

    var authorizeUri = 'http://localhost:21681/OAuth/Authorize';
    var returnUri = 'http://' + $scope.subDomain + '.localhost:50680/SignIn.html';
    var productApiUri = "http://localhost:48846/api/Products";
    var productOneUri = "http://localhost:48846/api/Products/1";
    var provisioningUrl = "http://localhost:44552/api/tenants/";

    function addQueryString(uri, parameters) {
        var delimiter = (uri.indexOf('?') == -1) ? '?' : '&';
        for (var parameterName in parameters) {
            var parameterValue = parameters[parameterName];
            uri += delimiter + encodeURIComponent(parameterName) + '=' + encodeURIComponent(parameterValue);
            delimiter = '&';
        }
        return uri;
    };
           
    function loadImage(uri) {
        var promiseUrl = loginService.getLogoData(uri);
        promiseUrl.then(function (p1) {
            $scope.urlData = p1.data;
            $scope.isLogged = true;
        },
         function (errorPl) {
             $log.error('failure loading logo data', errorPl);
         });
    };
    
    $scope.startApp = function () {
        var nonce = 'my-nonce';
        var subdomain = $scope.subDomain;
        var uri = addQueryString(authorizeUri, {
            'client_id': '7890ab',
            'redirect_uri': returnUri,
            'state': nonce,
            'scope': 'bio notes',
            'response_type': 'token',
            'tenant': subdomain
        });
        window.oauth = {};

        function GetUserDataUsingToken() {      // Function to get user data using token
            var promiseGet = loginService.getUserData($scope.AccessToken);      //send the token and get data
            promiseGet.then(function (p1) {
                $scope.obj = p1.data;
                $scope.uri = 'http://localhost:44552/api/tenants/' + $scope.obj[1].Value + '/users/' + $scope.obj[0].Value;
                loadImage($scope.uri);
                if ($scope.obj[2].Value == 'Administrator') {
                    $scope.isAdmin = true;
                    showProducts();
                }
                else {
                    $scope.isUser = true;
                }

            },
             function (errorPl) {
                 console.log('failure loading token data', errorPl);
             });
        }
                
        var LocalTokenAvailable = isLocalTokenAvailable();     //check there is a token in locally
        if (LocalTokenAvailable === true) {
            console.log("local token available");
            /*TODO:validate token
              currently assume it is valid always 
              if valid use it
              get the token from localstorage*/

            $scope.AccessToken = $localStorage.token;
            GetUserDataUsingToken();     //then get user details
            //TODO:If not valid token, request new one
        } else {
            console.log("local token not available");    //else we should request a new token
            window.oauth.signin = function (data) {    //requesting a new token
                if (data.state !== nonce) {
                    return;
                }
                $scope.AccessToken = data.access_token;      //data is return, we have access token there
                $localStorage.token = data.access_token;       //save token to localstorage
                GetUserDataUsingToken();    //take userData with access token
            }
            window.open(uri, 'Authorize', 'width=480,height=640');
        }
        
         /* Logout function
            TODO:remove from logincontroller.js and 
            put it in different file
         */

        $scope.logout = function () {
            console.log($localStorage.token);    //delete the token
            window.localStorage.clear();     //clear all local storage data
            $window.location.reload();    //refresh the page
        }
    };

    function showProducts () {
        var promiseProducts = loginService.getProductData(productApiUri, $scope.AccessToken);
        promiseProducts.then(function (p1) {
            $scope.Products = p1.data;
        },
        function (errorPl) {
             $log.error('failure loading product data', errorPl);
        });
    }
});
