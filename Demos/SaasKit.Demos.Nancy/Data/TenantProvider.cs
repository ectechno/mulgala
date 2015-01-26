using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SaasKit.Demos.Nancy.Data
{
    public class TenantProvider:ITenantIdentifier
    {
        

        public UserTenant GetTenant(string host)
        {
            List<UserTenant> tenants = SaasKit.Demos.Nancy.Program.TenantList;

            int i;
            for (i = 0; i < tenants.Count; i++)
            {
                if (tenants[i].HostName == host)
                {
                    return tenants[i];
                }
            }
            return null;

        }
    }
}
