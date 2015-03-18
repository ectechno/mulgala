//Created by Madushanka on 2/02/2015.
angular.module('admin').service('MessageService', function ($rootScope)
{
    this.showErrorMessage = function (title, message)
    {
        $rootScope.$emit(SHOW_ERROR_MESSAGE, { 'title': title, 'message': message });
    };
    this.showSuccessMessage = function (title, message)
    {
        $rootScope.$emit(SHOW_ERROR_MESSAGE, { 'title': title, 'message': message });
    };
});