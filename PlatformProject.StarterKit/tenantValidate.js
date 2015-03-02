//this is a script that checks current tenant is available or not


//get the subdomain
var full = window.location.host;
var parts = full.split('.');
var subdomain = parts[0];

var provisioningUrl = "http://localhost:44552/api/tenants/";

var apiUrl = provisioningUrl + subdomain;

/*
 * Check subdomain is valid one
 * 
 */
function isSubdomainValid(subdomain, apiUrl) {
    //return true;
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl, false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        console.log("Your response " + request.responseText);
        return true;
    }
    else {
        return false;
    }

}

var valid = isSubdomainValid(subdomain, apiUrl);
if (valid == false) {
    //if not valid do not show anything
    console.log("this is a invalid subdomain");
    window.open("error.html", "_parent");

} else {
    console.log("this is a valid subdomain");
}


