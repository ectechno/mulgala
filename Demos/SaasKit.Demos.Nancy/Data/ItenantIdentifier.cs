using System;
using System.Collections.Generic;
using System.Linq;

using System.Text;
using System.Threading.Tasks;

namespace SaasKit.Demos.Nancy.Data
{
    interface ITenantIdentifier
    {
        UserTenant GetTenant(String host);
    }
}
