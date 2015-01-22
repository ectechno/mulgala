using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlatformProject.AuthServer.Models
{
    public class Tenant
    {
        public int ID { get; set; }
        public String GUID { get; set; }
        public String TenantString { get; set; }
        public String Name { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}