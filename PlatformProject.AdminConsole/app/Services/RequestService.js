//Created by Madushanka on 29/01/2015.

//http://localhost:44552
//http://localhost:44552/api/tenants


angular.module('admin').service('RequestService', function ($http)
{
    var responce = {
        isSuccess: false,
        data: null
    };

    //Create new record
    this.post = function (requestUrl,data,headers)
    {
        $http({
            method: "POST",
            url: requestUrl,
            params: data,
            headers: headers
        }).success(function (status)
        {
            this.responce.isSuccess = true;
            this.responce.data = status;
        });
        return this.responce;
    }
    //Get  Records
    this.get = function (requestUrl, data,headers)
    {
        $http({
            method: 'get',
            url: requestUrl,
            params: data,
            headers: headers
        }).success(function (status)
        {
            this.responce.isSuccess = true;
            this.responce.data = status;
        });
        return this.responce;
    }

    //Update the Record
    this.put = function (requestUrl, data)
    {
        var request = $http({
            method: "PUT",
            url: requestUrl,
            params: data
        });
        return request;
    }
    //Delete the Record
    this.delete = function (requestUrl)
    {
        var request = $http({
            method: "DELETE",
            url: requestUrl
        });
        return request;
    }

    this.sendHTTPRequest = function (requestUrl, data,requestMode)
    {
        $http({
            method: requestMode,
            url: requestUrl,
            params: data
        }).success(function (status)
        {
            this.responce.isSuccess = true;
            this.responce.data = status;
        });
        return this.responce;
    }
});



/*
angular.module('admin').service('RequestService', function ($http)
{
    var responce = {
        isSuccess: false,
        data: null
    };

    //Create new record
    this.post = function (requestUrl,data)
    {
        return this.sendHTTPRequest(requestUrl,data,"POST");
    }
    //Get Single Records
    this.get = function (requestUrl, data)
    {
        return this.sendHTTPRequest(requestUrl,data,'get');
    }

    //Update the Record
    this.put = function (requestUrl, data)
    {
        return this.sendHTTPRequest(requestUrl,data,"PUT");
    }
    //Delete the Record
    this.delete = function (requestUrl)
    {
        return this.sendHTTPRequest(requestUrl,data,"DELETE");
    }

    this.sendHTTPRequest = function (requestUrl, data,requestMode)
    {
        $http({
            method: requestMode,
            url: requestUrl,
            params: data
        }).success(function (status)
        {
            this.responce.isSuccess = true;
            this.responce.data = status;
        });
        return this.responce;
    }
});

*/