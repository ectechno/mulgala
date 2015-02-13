//Created by Madushanka on 29/01/2015.

//angular.module('admin').service('UserService', ['$http', '$rootScope', '$cookies', '$cookieStore', 'MessageService', 'RequestService',
//  function ($http, $rootScope, $cookies, $cookieStore, MessageService, RequestService)

angular.module('admin').service('UserService',['$http', 'RequestService', function ($http, RequestService) {
    
        var userData = {
            userInfo: null,
            userTypes:null

        };

        function createUser(userObj) {
            //var key = $cookies.sessionKey;
            var request = 'http://localhost:44552/api/users/';
            var params = {
                "Id": 0,
                "Name": userObj.uName,
                "Email": userObj.uEmail,
                "LogoUrl": userObj.uLogo,
                "RoleId": userObj.uRole,
                "TenantId": userObj.uTenant,
                "UserName": userObj.username,
                "Password":userObj.uPassword,
                "Enable": userObj.uEnable
            };

            var headers = {
                'Content-Type': 'application/json',
                //session: key
            };
            var status = RequestService.post(request, params, headers);

            if (status.isSuccess) {
               // MessageService.showErrorMessage('Message', 'Message');
            } else if (!status.isSuccess) {
               // MessageService.showErrorMessage('Error Message', status.data.error);
            }
            return status;
        }

        this.getUsers = function() {
            var request = 'http://localhost:44552/api/users/';
            var params = null;
            var header = {
                'Content-Type': 'application/json'
            };
            var status = RequestService.get(request, params, header);
            return status;
        }

        function updateUser(userID,user) {
            var request = 'http://localhost:44552/api/users/' + user.uId;
            var params = {
                "Id": user.uId,
                "Name": user.uName,
                "Email": user.uEmail,
                "LogoUrl": user.uLogo,
                "RoleId":user.uRole,
                "TenantId":user.uTenant,
                "Enable": user.uEnable
            };
            var status = RequestService.put(request, params);
            return status;
        }

        function removeUser(userId) {
            var request = 'http://localhost:44552/api/users/' + userId;
            var status = RequestService.delete(request);
            return status;
        }

        function getUserData(userId) {
            //var key = $cookies.sessionKey;
            var request = 'http://localhost:44552/api/users/' + userId;
            var params = {
                id: userId
            };
            var header = {
                'Content-Type': 'application/json'
            };
            var status = RequestService.get(request, params, header);

            if (status.isSuccess) {
                // MessageService.showErrorMessage('Message', 'Message');
            } else if (!status.isSuccess) {
                //MessageService.showErrorMessage('Error Message', status.data.error);
            }
            return status;
        }

        
        function loginByToken(token, provider, cb)
        {
            var headers = {
                token: token
            };
            if (userData) headers.session = userData.userInfo.sessionKey;
            var request;
            var status = RequestService.get(request,null, headers);

            if (status.isSuccess)
            {
                userData.userInfo = status.data;
                $cookies.sessionKey = userData.userInfo.sessionKey;
                $rootScope.$broadcast(USER_LOGIN_EVENT, userData);
            } else if  (!status.isSuccess)
            {
                MessageService.showErrorMessage('Error Message', status.data.error);
            }

        };

        function userLogin(user, cb)
        {
            var key = $cookies.sessionKey;
            var request;
            var params = {
                    username:user.name,
                    password: user.password
            };

            var header = {
                'Content-Type': 'application/json'
            };

            var status = RequestService.get(request, params, header);

            if (status.isSuccess)
            {
                userData.userInfo = status.data;
                $cookies.sessionKey = userData.userInfo.sessionKey;
            }
            else if (!status.isSuccess)
            {
                MessageService.showErrorMessage('Error Message', status.data.error);
            }
        };
         
        function logout(user)
        {
            var key = $cookies.sessionKey;
            var request;
            var headers = {
                'Content-Type': 'application/json',
                session: key
            };
            var status = RequestService.get(request, null, headers);

            if (status.isSuccess)
            {
                userData = null;
                $cookieStore.remove('sessionKey');
            }
            else if (!status.isSuccess)
            {
                MessageService.showErrorMessage('Error Message', status.data.error);
            }
        };


        function getUserType()
        {

            var key = $cookies.sessionKey;
            var request;

            var headers = {
                'Content-Type': 'application/json',
                session: key
            };
            var status = RequestService.get(request, null, headers);

            if (status.isSuccess)
            {
                userData.userTypes = status.data;
            }
            else if (!status.isSuccess)
            {
                MessageService.showErrorMessage('Error Message', status.data.error);
            }
        };

        this.getUserType = getUserType;
        this.logout = logout;
        this.loginByToken = loginByToken;
        this.userLogin = userLogin;
        this.createUser = createUser;
        this.updateUser = updateUser;
        this.removeUser = removeUser;
        this.getUserData = getUserData;
    }]);