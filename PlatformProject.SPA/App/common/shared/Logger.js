/**
 * User: nalinK
*/

var Logger = (function ()
{
    var isLogEnable = true;
    var isAlertEnable = true;

    return {

        showAlert : function ( msg )
        {

            if ( isAlertEnable == true )
            {
                alert( msg );
            }
        },
        logMessage : function ( msg )
        {

            if ( isLogEnable == true )
            {
                console.log(msg , "color:green; background-color:yellow" , "font-style: italic" );
            }
        },
        logConsole : function ( msg )
        {

            if ( isLogEnable == true )
            {
                console.log('HTML5 ' + msg , "color:green; background-color:yellow", "font-style: italic");
            }
        },
        logDebug: function ( msg )
        {

            if ( isLogEnable == true )
            {
                console.debug(" DEBUG  : " + msg , "color:green; background-color:yellow", "font-style: italic");
            }
        },
        logInfo: function ( msg )
        {

            if ( isLogEnable == true )
            {
                console.info(" INFO  : " + msg , "color:green; background-color:yellow", "font-style: italic");
            }
        },
        logWarn: function ( msg )
        {

            if ( isLogEnable == true )
            {
                console.warn(" INFO  : " + msg, "color:green; background-color:yellow", "font-style: italic");
            }
        },
        logError: function ( msg )
        {

            if ( isLogEnable == true )
            {
                console.error(" INFO  : " + msg, "color:green; background-color:yellow", "font-style: italic");
            }
        },
        logAssert: function ( msg )
        {

            if ( isLogEnable == true )
            {
                console.assert(" INFO  : " + msg, "color:green; background-color:yellow", "font-style: italic");
            }

        },
        logException: function (ex, file)
        {

            if (isLogEnable == true)
            {
                console.assert(" EXCEPTION in " + file + " \n" + ex, "color:green; background-color:yellow", "font-style: italic");
            }
        },
        AlertException: function (ex, file)
        {

            if (isLogEnable == true)
            {
                alert("Exception in " + file + " \n" + ex);
            }
        },
        logClean: function (msg)
        {
            console.clear();
        },
        setLogEnable: function (isEnable)
        {
            isLogEnable = isEnable;
        },
        setAlertEnable: function (isEnable)
        {
            isAlertEnable = isEnable;
        }
    }
})();
