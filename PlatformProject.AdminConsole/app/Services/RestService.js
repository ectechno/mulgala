﻿//Created by Madushanka on 24/02/2015.

angular.module('admin').factory('RestService', function ($resource)
{
    this.ResuestData = function (restPath)
    {
        return $resource(restPath); 
    };
})