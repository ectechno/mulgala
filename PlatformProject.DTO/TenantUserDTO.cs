using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.DTO
{
    public class TenantUserDTO
    {
        public string TenantString { get; set; }

        public string TenantName { get; set; }

        public string TenantLogoUrl { get; set; }

        public string UserName { get; set; }

        public string UserEmail { get; set; }

        public string UserLogoUrl { get; set; }

        public string UserRole { get; set; }
    }
}
