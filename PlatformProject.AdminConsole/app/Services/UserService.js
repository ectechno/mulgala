//Created by Madushanka on 29/01/2015.

angular.module('UserService').service('MetaDataService',['$http', '$rootScope', '$cookies', '$cookieStore', 'MessageService', 'RequestService',
    function ($http, $rootScope, $cookies, $cookieStore, MessageService, RequestService)
    {
        var userData = {
            userInfo: null,
            userTypes:null

        };
        
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

            var status = RequestService.get(request,params,null);

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
            var headers = { session: key };
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
            var headers = { session: key };
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

        function createUser(userObj)
        {
            var key = $cookies.sessionKey;
            var request;
            var params = {
                id: userObj.id,
                name: userObj.name,
                logo: userObj.logo,
                email: userObj.email,
                role: userObj.role,
                tenant: userObj.tenant,
                password: userObj.password,
                enable: userObj.enable,
                username: userObj.username,
                dateTime: userObj.dateTime
            };
            var status = RequestService.get(request, params, null);

            if (status.isSuccess)
            {
                MessageService.showErrorMessage('Message', 'Message');
            } else if (!status.isSuccess)
            {
                MessageService.showErrorMessage('Error Message', status.data.error);
            }
            return status;
        }
        function updateUser() {

        }
        function removeUser(){

        }
        function getUserData() {

        }


        this.getUserType = getUserTyp;
        this.logout = logout;
        this.loginByToken = loginByToken;
        this.userLogin = userLogin;
        this.createUser = createUser;
        this.updateUser = updateUser;
        this.removeUser = removeUser;
        this.getUserData = getUserData;
    }]);