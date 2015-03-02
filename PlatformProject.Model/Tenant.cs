using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlatformProject.Model
{
    public class Tenant: IIdentityField
    {
        public int Id { get; set; }

        public Guid GUID { get; set; }

        public string TenantString { get; set; }

        public string Name { get; set; }
        
        public string LogoUrl { get; set; }

        public bool Enable { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public int? CreatorId { get; set; }
        public virtual User Creator { get; set; }

        public int? UpdaterId { get; set; }
        public virtual User Updater { get; set; }

        public virtual IList<User> Users { get; set; }
    }
}