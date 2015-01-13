/**
 * User: nalinK
*/

var ErrorHandler = ( function () {

    var provider = this;

    return {

        init: function ()
        {
        },
        getErrorMessage: function (errorCode)
        {
            var result = LocalisationHandler.getLocalizedString(errorCode);
            return result;
        }
    };
})();