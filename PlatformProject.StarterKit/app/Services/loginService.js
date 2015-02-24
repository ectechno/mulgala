angular.module('starterkit').service('loginService', function ($http) {

    this.getUserData = function (accessToken) {
        var request = $http({
            method: 'get',
            url: 'http://localhost:48846/api/Me',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            dataType: 'text',
            cache: false,
        });
        return request;
    }


    this.getLogoData = function (logoUri) {
        var request = $http({
            method: 'get',
            url: logoUri,
            dataType: 'text',
            cache: false,
        });
        return request;
    }


    this.getProductData = function (productUri, accessToken) {
        var request = $http({
            method: 'get',
            url: productUri,
            headers: { 'Authorization': 'Bearer ' + accessToken },
            dataType: 'text',
            cache: false,
        });
        return request;
    }


})






    