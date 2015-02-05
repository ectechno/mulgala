using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.DTO
{
    public class TenantDTO
    {
        public int Id { get; set; }

        public string TenantString { get; set; }

        public string Name { get; set; }

        public string LogoUrl { get; set; }

        public bool Enable { get; set; }
    }
}
