using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlatformProject.Model
{
    public class Tenant
    {
        public int ID { get; set; }
        public String GUID { get; set; }
        public String TenantString { get; set; }
        public String Name { get; set; }
        public String LogoUrl { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}