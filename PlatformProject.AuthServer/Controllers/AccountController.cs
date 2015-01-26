using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using PlatformProject.Model;

using PlatformProject.Data;

namespace PlatformProject.AuthServer.Controllers
{
    public class AccountController : Controller
    {

        private PlatformProjectDBContext db = new PlatformProjectDBContext();

        public ActionResult Login()
        {

            // Find the tenant form the query string
            var tenant = "";
            foreach (var item in Request.QueryString.Get("ReturnUrl").Split('&'))
            {
                if (item.Split('=').Length == 2 && item.Split('=')[0].ToLower() == "tenant")
                {
                    tenant = item.Split('=')[1].ToLower();
                }
            }

            //To-Do : Add validation for the tenant like null validation ..etc
            
            // Authenticate the user
            var authentication = HttpContext.GetOwinContext().Authentication;
            if (Request.HttpMethod == "POST")
            {
                var isPersistent = !string.IsNullOrEmpty(Request.Form.Get("isPersistent"));

                if (!string.IsNullOrEmpty(Request.Form.Get("submit.Signin")))
                {
                    var username = Request.Form["username"];
                    var password = Request.Form["password"];
                    User currentUser = db.Users.FirstOrDefault(user => user.UserName == username && user.Password == password && user.Tenant.TenantString == tenant);

                    if (currentUser != null)
                    {
                        authentication.SignIn(
                        new AuthenticationProperties { IsPersistent = isPersistent },
                        new ClaimsIdentity(
                            new[] { 
                                new Claim(ClaimsIdentity.DefaultNameClaimType, Request.Form["username"]),
                                new Claim("urn:oauth:tenant", tenant)
                            },
                            "Application"));
                    }
                    else
                    {
                        // Display the un authorized error message
                        authentication.Challenge("Application");
                        return new HttpUnauthorizedResult();
                    }
                    
                }
            }

            return View();
        }

        public ActionResult Logout()
        {
            return View();
        }

        public ActionResult External()
        {
            var authentication = HttpContext.GetOwinContext().Authentication;
            if (Request.HttpMethod == "POST")
            {
                foreach (var key in Request.Form.AllKeys)
                {
                    if (key.StartsWith("submit.External.") && !string.IsNullOrEmpty(Request.Form.Get(key)))
                    {
                        var authType = key.Substring("submit.External.".Length);
                        authentication.Challenge(authType);
                        return new HttpUnauthorizedResult();
                    }
                }
            }
            var identity = authentication.AuthenticateAsync("External").Result.Identity;
            if (identity != null)
            {
                authentication.SignOut("External");
                authentication.SignIn(
                    new AuthenticationProperties { IsPersistent = true },
                    new ClaimsIdentity(identity.Claims, "Application", identity.NameClaimType, identity.RoleClaimType));
                return Redirect(Request.QueryString["ReturnUrl"]);
            }

            return View();
        }
    }
}