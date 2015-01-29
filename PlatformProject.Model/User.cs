using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlatformProject.Model
{
    public class User
    {
        public int ID { get; set; }
        public String Name { get; set; }
        public String UserName { get; set; }
        public String Password { get; set; }
        public String LogoUrl { get; set; }
        
        public string RoleId { get; set; }
        public virtual Role Role { get; set; }

        public int TenantId { get; set; }
        public virtual Tenant Tenant { get; set; }
    }
}