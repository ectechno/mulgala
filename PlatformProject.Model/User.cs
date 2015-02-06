using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PlatformProject.Model
{
    public class User: IIdentityField
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string LogoUrl { get; set; }

        public bool Enable { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        //[ForeignKey("Creator")]
        public int? CreatorId { get; set; }
        public virtual User Creator { get; set; }

        //[ForeignKey("Updater")]
        public int? UpdaterId { get; set; }
        public virtual User Updater { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; }

        public int TenantId { get; set; }
        public virtual Tenant Tenant { get; set; }
    }
}