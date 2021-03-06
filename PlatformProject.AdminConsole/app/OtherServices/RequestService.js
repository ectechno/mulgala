﻿//Created by Madushanka on 29/01/2015.
angular.module('admin').service('RequestService', function ($http) {
    var response = {
        isSuccess: false,
        data: null
    };

    //Create new record
    this.post = function (requestUrl, data, headers) {

        $http({
            method: "post",
            url: requestUrl,
            data: data,
            headers: headers
        }).success(function (status) {
            response.isSuccess = true;
            response.data = status;

        });
        return response;
    }

    //Get  Records
    this.get = function (requestUrl, data, headers) {
        var request = $http({
            method: 'get',
            url: requestUrl,
            data: data,
            headers: headers
        });
        return request;
    }

    //Update the Record
    this.put = function (requestUrl, data) {
        var request = $http({
            method: "put",
            url: requestUrl,
            data: data
        });
        return request;
    }

    //Delete the Record
    this.delete = function (requestUrl) {
        var request = $http({
            method: "delete",
            url: requestUrl
        });
        return request;
    }

    this.sendHTTPRequest = function (requestUrl, data, requestMode) {
        $http({
            method: requestMode,
            url: requestUrl,
            data: data
        }).success(function (status) {
            response.isSuccess = true;
            response.data = status;
        });
        return response;
    }
});


