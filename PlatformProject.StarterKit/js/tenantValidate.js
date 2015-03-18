//this is a script that checks current tenant is available or not

var full = window.location.host;    //get the subdomain
var parts = full.split('.');
var subdomain = parts[0];

var provisioningUrl = "http://localhost:44552/api/tenantdetails/";
var apiUrl = provisioningUrl + subdomain;

function isSubdomainValid(subdomain, apiUrl) {  // Check subdomain is valid one
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
    console.log("this is a invalid subdomain");    //if not valid do not show anything
    window.open("error.html", "_parent");

} else {
    console.log("this is a valid subdomain");
}


