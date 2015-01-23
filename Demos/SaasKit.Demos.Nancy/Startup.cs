using Owin;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using SaasKit.Demos.Nancy.Data;

namespace SaasKit.Demos.Nancy
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseSaasKit(ConfigureSaasKit())
               .UseWebApi(ConfigureWebApi())
               .UseNancy();
        }

        private ISaasKitEngine ConfigureSaasKit()
        {
            var config = new SaasKitConfiguration
            {
                TenantResolver = new MyResolver(),
                Logger = msg => Console.WriteLine(msg)
            };

            var instanceStore = new MemoryCacheInstanceStore(
                new InstanceLifetimeOptions { 
                    Lifetime =  TimeSpan.FromSeconds(3600),
                    UseSlidingExpiration = true
                }
            );

            return new SaasKitEngine(config, instanceStore);
        }

        private HttpConfiguration ConfigureWebApi()
        {
            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute("Default", "api/{controller}", new { controller = "home" });

            return config;
        }
    }

    public class MyResolver : ITenantResolver
    {
        TenantProvider tenantProvider = new TenantProvider();

        public Task<ITenant> Resolve(string tenantIdentifier)
        {
            UserTenant userTenant = tenantProvider.GetTenant(tenantIdentifier);

            //Console.WriteLine(userTenant.TenantName);
            if (userTenant != null)
            {

                string tenantName = userTenant.TenantName;

                var tenant = new Tenant
                {


                    Name = tenantName,
                    RequestIdentifiers = new[] {tenantIdentifier}
                };

                return Task.FromResult<ITenant>(tenant);
            }
            else
            {
                //return error page
                return null;
            }

        }
    }
}