/**
 * User: nalinK
*/


var LocalisationHandler = (function ()
{
    this.languages = ['en-US', 'si-LK', 'ta-LK'];
    this.ext = 'js';
    var provider = this;
    this.localize = {

        language: 'en-US',
        dictionary: [],
        url: undefined
    }

    return {

        init: function (key,value)
        {
            localize.language=value;
            var url = this.buildUrl();
            var localizedResponce = SharedFunctions.gethttpGetResponse(url);
            this.successCallback(JSON.parse(localizedResponce));
            answer=this.getLocalizedString(key);
            
            return answer;
        },
        
        buildUrl: function ()
        {
            
            if (localize.language == "si-LK")
            {
                //localize.language = provider.defaultLanguage;
                //return 'common/localisation/resources-locale_' + localize.language + '.' + provider.ext;
                return 'common/localisation/resources-locale_si-LK' + '.' + provider.ext;
               
            } 
            else if(localize.language == "en-US"){
                return 'common/localisation/resources-locale_en-US' + '.' + provider.ext;
            }
            else{
                return 'common/localisation/resources-locale_ta-LK' + '.' + provider.ext;
            }
            
        },
       
        getLocalizedString: function (key,value)
        {
           var result = '';

            if ((localize.dictionary !== []) && (localize.dictionary.length > 0))
            {
                var values = localize.dictionary;

                for (var count = 0 ; count < values.length ; count++) {

                    var entry = values[count];

                    if (entry.key === key)
                    {
                        return entry.description;
                    }
                }
            }
            return result;
        },
        successCallback: function (data)
        {
            // store the returned array in the dictionary
            localize.dictionary = data;
            //alert(localize.dictionary);
        },
        setLanguage: function (value)
        {
            localize.language = this.fallbackLanguage(value);
            //initLocalizedResources();
            
        },
        fallbackLanguage: function (value)
        {

            value = String(value);

            if (provider.languages.indexOf(value) > -1)
            {
                return value;
            }

            value = value.split('-')[0];

            if (provider.languages.indexOf(value) > -1)
            {
                return value;
            }

            return provider.defaultLanguage;
        }
       
            

    };
})();
