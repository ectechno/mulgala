var app = angular.module('starterkit', []);

app.controller('loginController', function ($scope,loginService) {
    $scope.isLogged = false;
    $scope.isAdmin = false;
    $scope.isUser = false;
    $scope.obj = [];
    $scope.uri = '';
    $scope.AccessToken = '';

    var authorizeUri = 'http://localhost:21681/OAuth/Authorize';
   // var tokenUri = 'http://localhost:21681/OAuth/Token';
   // var apiUri = 'http://localhost:48846/api/Me';
    var returnUri = 'http://localhost:50680/SignIn.html';
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
        var uri = addQueryString(authorizeUri, {
            'client_id': '7890ab',
            'redirect_uri': returnUri,
            'state': nonce,
            'scope': 'bio notes',
            'response_type': 'token',
            'tenant': 'Sony'
        });

        window.oauth = {};

        window.oauth.signin = function (data) {
            if (data.state !== nonce) {
                return;
            }

            $scope.AccessToken = data.access_token;

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
        window.open(uri, 'Authorize', 'width=640,height=760');
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
