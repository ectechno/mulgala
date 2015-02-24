//Created by Madushanka on 24/02/2015.

angular.module('admin').factory('RestService', function ($resource)
{
    this.requestData = function (restPath)
    {
        return $resource(restPath); 
    };

    this.get = function (restPath,getParam)
    {
        return this.requestData(restPath).get(getParam, function () { });
    }
    this.getAll = function (restPath, getParam)
    {
        return this.requestData(restPath).query(getParam, function () { });
    }
    this.save = function (restPath, data)
    {
        this.requestData(restPath).save(data, function () { });
    }
    this.update = function (restPath, data)
    {
        this.requestData(restPath).update(data, function () { });
    }
})