using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string LogoUrl { get; set; }

        public bool Enable { get; set; }

        public string Role { get; set; }

        public string Tenant { get; set; }

        public int RoleId { get; set; }

        public int TenantId { get; set; }
    }

    public class UserUpdateDTO 
    {
        public string Name { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string LogoUrl { get; set; }

        public bool Enable { get; set; }

        public int RoleId { get; set; }

        public int TenantId { get; set; }
    }
}

