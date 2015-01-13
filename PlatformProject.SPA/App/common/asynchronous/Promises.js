/**
 * User: nalinK
*/
var timeConsumingJob = function () {

    return Q.delay(true, 3000);
}

var Promises = (function () {

    function gotQ() {
        if (typeof Q != 'undefined') {
            console.log(Q);
            return true;
        }
        else {
            return false
        }
    }
	var isWingsUp = false;
    var preloaderHandler;
    var preloader;
	function setDefaultPreloader(divId){
	    preloader = new WingsPreloader().init();
	    preloader.PRE_LOADER_LOADING_LAYOUT_ID = divId;
	    preloaderHandler = PreloaderHandler.init();
	    preloaderHandler.loadPreloader(preloader);
		
	}
	function removeDefaultPreloader(){
		preloaderHandler.dismissPreloader();
		
	}
	
	function dummy(){
		return Q.delay(true, 3000);
	}
	
    return {
		
		
       Testing: function () {
            setDefaultPreloader();

        }
        ,
        callFunction: function (functionName,divId) {
            
             //We are going to call time consuming function
             //Set preloader here
             
            setDefaultPreloader(divId);

            //make promise variable
            var promise = Q.all([
                functionName()
            ]);

            promise.then(function (x) {
                
                console.log(x);

                // Remove preloader here
                removeDefaultPreloader();
         
            })
            .done();

        }

    }

})();





