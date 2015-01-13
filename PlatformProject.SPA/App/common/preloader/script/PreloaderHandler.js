
/**
 * User: nalinK
*/

var PreloaderHandler = (function(){
    
    return{

        init:function(){
       
            return new Preloader();
        }

    };

    function Preloader()
    {
        var currentPreloader;
        return {

            loadPreloader: function (preLoader)
            {
                currentPreloader = preLoader;
                document.getElementById(currentPreloader.PRE_LOADER_LOADING_LAYOUT_ID).innerHTML = currentPreloader.PRE_LOADER_TRPE;
            },
            dismissPreloader: function ()
            {
                document.getElementById(currentPreloader.PRE_LOADER_LOADING_LAYOUT_ID).innerHTML = "";
            }

        };

    };

    
})();
