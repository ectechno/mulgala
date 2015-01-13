/**
 * User: nalinK
*/


//{
//    WINGS_PRE_LOADER:'',
//    WINGS_POPUP:''
//}

var Wings = (function(){
    
    return {

        init: function ()
        {
            return new WingsHandler();
        }
    }
})();

function WingsHandler()
{
    var isWingsUp = false;
    var preloaderHandler;

    return {

        requestAction: function ( propertys)
        { 
            //   var wingsPreloader = propertys.WINGS_PRE_LOADER;
            //   var wingsPopup = propertys.WINGS_POPUP;

            //if (wingsProgres != '' || wingsProgres.IS_PRE_LOADER_SHOW === true)
            //{
            //    PreloaderHandler.init().loadPreloader(wingsPreloader);
            //}
            //if (wingsPopup != '' || wingsPopup.IS_POPUP_SHOW === true)
            //{
            //  //  PreloaderHandler.loadPreloader(wingsPreloader);
            //}
           var preloader = new WingsPreloader().init();
           preloader.PRE_LOADER_LOADING_LAYOUT_ID = "mappp";
           preloaderHandler = PreloaderHandler.init();
           preloaderHandler.loadPreloader(preloader);

           setTimeout(function ()
           {
               preloaderHandler.dismissPreloader();
           }, 10000);
        }
};

};

function WingsPreloader()
{
    var properties = {

        PRE_LOADER_TRPE: preLoaders.LINE_PRE_LOADER,
        WORNING_PRE_LOADER_TRPE: '',
        NOTIFICATION_PRE_LOADER_TRPE: '',
        PRE_LOADER_LOADING_LAYOUT_ID: '',
        IS_PRE_LOADER_SHOW: false
    };

    return {

        init: function ()
        {
            return properties;
        },
    };
};

function WingsProgress()
{
    var properties = {

        PROGRESS_TRPE: preLoaders.ROUNDED_PRE_LOADER,
        WORNING_PROGRESS_TRPE: '',
        NOTIFICATION_PROGRESS_TRPE: '',
        PROGRESS_LOADING_LAYOUT_ID: '',
        IS_PROGRESS_SHOW: false
    };

    return {

        init: function ()
        {
            return properties;
        },
    };
};


function WingsPopup()
{
    var properties = {

        ERROR_POPUP_TRPE: '',
        WORNING_POPUP_TRPE: '',
        NOTIFICATION_POPUP_TRPE: '',
        POPUP_LOADING_LAYOUT_ID: '',
        IS_POPUP_SHOW : false
    };

    return {

        init: function ()
        {
            return properties;
        },
    };
};

function WingsProgres()
{
    var properties = {

        PROGRESS_TRPE:'',
        PROGRESS_LOADING_LAYOUT_ID: '',
        IS_PROGRES_SHOW: false
    };

    return {

        init: function ()
        {
            return properties;
        },
    };
};