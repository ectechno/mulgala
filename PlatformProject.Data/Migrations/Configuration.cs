using PlatformProject.Model;
using System.Collections.Generic;
using System.Data.Entity.Migrations;

namespace PlatformProject.Data
{


    internal sealed class Configuration : DbMigrationsConfiguration<PlatformProjectDBContext>
    {

        private List<Tenant> _tenants = new List<Tenant>();

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "PlatformProject.AuthServer.Models.PlatformProjectAuthServerContext";
        }

        private void configureTenants()
        {
            _tenants = new List<Tenant>
            {
                new Tenant()
                {
                    ID = 1,
                    GUID = "7f42acd7-067c-4c82-834e-021d4c0132e0",
                    Name = "Sony",
                    TenantString = "sony",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Sony-logo.jpg"
                },
                new Tenant()
                {
                    ID = 2,
                    GUID = "f70115e9-f644-4ba9-bcf6-2c1692d986e9",
                    Name = "Panasonic",
                    TenantString = "panasonic",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Panasonic-logo.jpg"
                },
                new Tenant()
                {
                    ID = 3,
                    GUID = "9168e6d4-6600-4f3b-9cab-d10e44f75500",
                    Name = "Samsung",
                    TenantString = "samsung",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Samsung-logo.jpg"
                },
                new Tenant()
                {
                    ID = 4,
                    GUID = "a66c80cd-0ba9-4261-b44a-6fc522fc6501",
                    Name = "Toshiba",
                    TenantString = "toshiba",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Toshiba-logo.jpg"
                }
            };
        }

        private void AddTenants(PlatformProjectDBContext context)
        {
            foreach (var tenant in _tenants)
            {
                context.Tenants.AddOrUpdate(t => t.ID, tenant);
            }
        }

        private void AddUsers(PlatformProjectDBContext context)
        {
            configureTenants();

            var users = new List<User>
            {
                new User()
                {
                    ID = 1,
                    Name = "Oliver Queen",
                    UserName = "Oliver",
                    Password = "oli@queen",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/Oliver-logo.jpg",
                    Tenant = _tenants[0]
                },
                new User()
                {
                    ID = 2,
                    Name = "Sara Lance",
                    UserName = "Sara",
                    Password = "sara@lance",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/Sara-logo.jpg",
                    Tenant = _tenants[1]
                },
                new User()
                {
                    ID = 3,
                    Name = "Sony Admin",
                    UserName = "soadmin",
                    Password = "admin",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/admin.png",
                    Tenant = _tenants[0]
                },
                new User()
                {
                    ID = 4,
                    Name = "Sony User",
                    UserName = "souser",
                    Password = "user",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/user.png",
                    Tenant = _tenants[0]
                },
                new User()
                {
                    ID = 5,
                    Name = "Samsung Admin",
                    UserName = "saadmin",
                    Password = "admin",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/admin.png",
                    Tenant = _tenants[1]
                },
                new User()
                {
                    ID = 6,
                    Name = "Samsung User",
                    UserName = "sauser",
                    Password = "user",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/user.png",
                    Tenant = _tenants[1]
                },
            };

            foreach (var user in users)
            {
                context.Users.AddOrUpdate(u => u.ID, user);
            }
        }


        protected override void Seed(PlatformProjectDBContext context)
        {
            AddTenants(context);
            AddUsers(context);
            context.SaveChanges();
        }
    }
}