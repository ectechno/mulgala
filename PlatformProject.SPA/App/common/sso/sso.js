var SingleSignOnHandler = (function () {

    var configuration;
    var access_token;

    return {

        Init: function (config) {
            configuration = config;
        },
        isLoggedIn: function () {
            if (this.validateToken()===true) {
                return true;
            } else {
                return false;
            }
        },
        LogIn: function () {
            this.getToken();
        },
        SignOut: function () {
            var token = readCookie('access_token');
            eraseCookie('access_token'); 
            //getJSONdata('https://accounts.google.com/o/oauth2/revoke?token=' + token);
        },
        getToken: function () {
            var config = {
                login_url: 'https://accounts.google.com/o/oauth2/auth',
                response_type: 'token',
                scope: 'profile',
                redirect_uri: 'http://localhost:8888',
                client_id: '484878723494-rsn3m0ra1epp566201cnoaimren97cgl.apps.googleusercontent.com'
            };
            var SSO_link = config.login_url + "?" + "response_type=" + encodeURIComponent(config.response_type) + "&" + "scope=" + encodeURIComponent(config.scope) + "&" + "redirect_uri=" + encodeURIComponent(config.redirect_uri) + "&" + "client_id=" + encodeURIComponent(config.client_id);

            window.location.href = SSO_link
        },
        setToken: function (token,time) {
            createCookie('access_token', token, time);
        },
        getProfile: function () {
            var token = readCookie('access_token');
            return getJSONdata('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);

        },
        validateToken: function () {
            var token = readCookie('access_token');
            var validation_json = getJSONdata('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token);
            if (validation_json.hasOwnProperty('error')) {
                return false;

            } else {
                return true;
            }
        }

    }

})();

SingleSignOnHandler.QueryString = function () {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        query = getHashFromUrl(window.location);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
}();

function getHashFromUrl(url) {
    var a = document.createElement("a");
    a.href = url;
    return a.hash.replace(/^#/, "");
}

function createCookie(name, value, time) {
    if (time) {
        var date = new Date();
        date.setTime(date.getTime() + (time * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function getJSONdata(url) {

    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);          
}

jQuery(document).ready(function () {
    if (SingleSignOnHandler.QueryString.access_token != undefined) {
        SingleSignOnHandler.setToken(SingleSignOnHandler.QueryString.access_token, SingleSignOnHandler.QueryString.expires_in)
    };    
});