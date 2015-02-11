//Created by Madushanka on 29/01/2015.

angular.module('admin').service('SharedServices', ['$window', function ($window)
{
    function locateToWindow(path)
    {
        alert('load');
        $window.location.href = path;
    }
}]);