using Owin;
using System.Threading.Tasks;

namespace SaasKit.Demos.AspNet
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var engine = new SaasKitEngine(new SaasKitConfiguration
            {
                TenantResolver = new MyResolver()
            });

            app.UseSaasKit(engine);
        }
    }

    public class MyResolver : ITenantResolver
    {
        public Task<ITenant> Resolve(string tenantIdentifier)
        {
            var tenant = new Tenant
            {
                Name = tenantIdentifier.Equals("localhost") ? "Tenant1" : "Tenant2",
                RequestIdentifiers = new[] { tenantIdentifier }
            };

            return Task.FromResult<ITenant>(tenant);
        }
    }
}