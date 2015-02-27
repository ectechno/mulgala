//Created by Madushanka on 29/01/2015.

angular.module('admin').service('SharedServices', ['$window', function ($window)
{
    function locateToWindow(path)
    {
        $window.location.href = path;
    }
    function reloadWindow() {
        $window.location.reload();
    }
    function setLocalStorage()
    {
    }
    function getLocalStorage()
    {

    }
}]);