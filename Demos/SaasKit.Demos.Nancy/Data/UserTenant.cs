using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SaasKit.Demos.Nancy.Data
{
    public class UserTenant
    {
        public String TenantName { get; set; }
        public int Id { get; set; }
        public String HostName { get; set; }
        public String Ip { get; set; }
        public int Port { get; set; }

        public UserTenant(String tenantName, int id, String hostName, String ip, int port)
        {
            this.TenantName = tenantName;
            this.Id = id;
            this.HostName = hostName;
            this.Ip = ip;
            this.Port = port;

        }



    }
}
