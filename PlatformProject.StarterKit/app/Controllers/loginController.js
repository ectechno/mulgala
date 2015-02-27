var app = angular.module('starterkit', ["ngStorage"]);

app.controller('loginController', function ($scope, loginService, $localStorage) {
    $scope.isLogged = false;
    $scope.isAdmin = false;
    $scope.isUser = false;
    $scope.obj = [];
    $scope.uri = '';
    $scope.AccessToken = '';


    /**
     * function to check if there is a
     * local token available
     */
    function isLocalTokenAvailable() {
        var token = $localStorage.token;
        if (typeof token == 'undefined') {
            //then there is no token
            return false;
        }else{
            //there is a token
            return true;
        }
    }


    //get the subdomain from url
    var full = window.location.host;
    var parts = full.split('.');
    var sub = parts[0];
    $scope.subDomain = sub;


    var authorizeUri = 'http://localhost:21681/OAuth/Authorize';
   // var tokenUri = 'http://localhost:21681/OAuth/Token';
   // var apiUri = 'http://localhost:48846/api/Me';
    var returnUri = 'http://' + $scope.subDomain + '.localhost:50680/SignIn.html';
    var productApiUri = "http://localhost:48846/api/Products";
    var productOneUri = "http://localhost:48846/api/Products/1";

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
        console.log($scope.subDomain + " is your subdomain");
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


        /*
         * Function to get user data using token
         */

        function GetUserDataUsingToken() {
            //send the token and get data
            var promiseGet = loginService.getUserData($scope.AccessToken);
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

        //check there is a token in locally
        //
        var LocalTokenAvailable = isLocalTokenAvailable();
        if (LocalTokenAvailable === true) {

            console.log("local token available");
            //TODO:validate token
            //currently assume it is valid always
            //if valid use it
            //get the token from localstorage
            $scope.AccessToken = $localStorage.token;

            //then get user details
            GetUserDataUsingToken();

            //TODO:If not valid token, request new one


        } else {
            //else we should request a new token
            console.log("local token not available");

            //requesting a new token
            window.oauth.signin = function (data) {
                if (data.state !== nonce) {
                    return;
                }

                //data is return, we have access token there
                $scope.AccessToken = data.access_token;

                //save token to localstorage
                $localStorage.token = data.access_token;

                //take userData with access token
                GetUserDataUsingToken();

            }
            window.open(uri, 'Authorize', 'width=640,height=760');


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
