using Nancy;
using SaasKit.Integration.Nancy;
using PlatformProject.Constants;

namespace SaasKit.Demos.Nancy.Modules
{  
    public class HomeModule : NancyModule
    {       
        public HomeModule()
        {
            Get["/"] = _ =>
            {
                var model = new
                {
                    module = "home",
                    Tenant = Context.GetTenantInstance(),
                    authorizeUri = Paths.AuthorizationServerBaseAddress + Paths.AuthorizePath,
                    tokenUri = Paths.AuthorizationServerBaseAddress + Paths.TokenPath,
                    apiUri = Paths.ResourceServerBaseAddress + Paths.MePath
                };
                
                return View["index", model];
            };

            Get["/signin"] = _ =>
            {
                var model = new
                {
                    module = "home",
                    Tenant = Context.GetTenantInstance(),
                    authorizeUri = Paths.AuthorizationServerBaseAddress + Paths.AuthorizePath,
                    tokenUri = Paths.AuthorizationServerBaseAddress + Paths.TokenPath,
                    apiUri = Paths.ResourceServerBaseAddress + Paths.MePath
                };

                return View["signin", model];
            };
        }
    }
}