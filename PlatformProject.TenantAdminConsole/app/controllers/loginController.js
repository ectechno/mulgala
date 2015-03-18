mainApp.controller('loginController', function ($scope, $rootScope, $window, loginService, $localStorage) {
    $rootScope.isAdmin = false;
    $scope.obj = [];
    $scope.uri = '';
    $scope.AccessToken = '';
    $rootScope.isLogged = false;
    $rootScope.fullName = '';
    $rootScope.userImage = '';
   
    var full = window.location.host;    //get the subdomain from url
    var parts = full.split('.');
    var sub = parts[0];
    $rootScope.subDomain = sub;

    function isLocalTokenAvailable() {
        var token = $localStorage.token;
        if (typeof token == 'undefined') {
            return false;
        } else {
            return true;
        }
    }

    var authorizeUri = 'http://localhost:21681/OAuth/Authorize';
    var tokenUri = 'http://localhost:21681/OAuth/Token';
    var apiUri = 'http://localhost:48846/api/Me';
    var returnUri = 'http://' + $scope.subDomain + '.localhost:23657/SignIn.html';
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
    
    function loadUserData(uri) {
        var promiseUrl = loginService.getLogoData(uri);
        promiseUrl.then(function (p1) {
            $scope.urlData = p1.data;
            $rootScope.fullName = $scope.urlData.userName;
            $rootScope.userImage = $scope.urlData.userLogoUrl;
            $rootScope.tenantImage = $scope.urlData.tenantLogoUrl;
            $rootScope.isLogged = true;
        },
         function (errorPl) {
             console.log('failure loading logo data', errorPl);
         });
    };

    function GetUserDataUsingToken() {
        var promiseGet = loginService.getUserData($scope.AccessToken);    //send the token and get data
        promiseGet.then(function (p1) {
            $scope.obj = p1.data;
            $scope.uri = 'http://localhost:44552/api/tenants/' + $scope.obj[1].Value + '/users/' + $scope.obj[0].Value;
            loadUserData($scope.uri);

            if ($scope.obj[2].Value == 'Administrator') {
                $rootScope.isAdmin = true;
            }
        },
         function (errorPl) {
             console.log('failure loading token data', errorPl);
         });
    }
    
    $scope.startApp = function () {
        var nonce = 'my-nonce';
        var subdomain = $rootScope.subDomain;
        var uri = addQueryString(authorizeUri, {
            'client_id': '7890ab',
            'redirect_uri': returnUri,
            'state': nonce,
            'scope': 'bio notes',
            'response_type': 'token',
            'tenant': subdomain
        });
        window.oauth = {};
        var LocalTokenAvailable = isLocalTokenAvailable();
        if (LocalTokenAvailable === true) {
            console.log("local token available");
            $scope.AccessToken = $localStorage.token;
            GetUserDataUsingToken();
        } else {
            console.log("local token not available");
            window.oauth.signin = function (data) {
                if (data.state !== nonce) {
                    return;
                }
                $scope.AccessToken = data.access_token;
                $localStorage.token = data.access_token;
                GetUserDataUsingToken();    //take userData with access token
            }
            window.open(uri, 'Authorize', 'width=480,height=640');
        };

        $scope.logout = function () {
            console.log($localStorage.token);
            window.localStorage.clear();
            $rootScope.isLogged = false;
            $rootScope.fullName = '';
            $rootScope.userImage = '';
            $rootScope.tId = '';
            $rootScope.tenantUsers = [];
            $rootScope.isAdmin = false;
            $rootScope.subDomain = '';
            $window.location.reload();
        };
    };
});