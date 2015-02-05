using System.Linq;
using PlatformProject.Model;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System;

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

        private void AddRoles(PlatformProjectDBContext context) 
        {
            context.Roles.Add(new Role { Id = 0, Name = "Administrator" });
            context.Roles.Add(new Role { Id = 0, Name = "User" });
            context.SaveChanges();
        }

        private void AddTenants(PlatformProjectDBContext context)
        {
            context.Tenants.AddOrUpdate(
                tenant => tenant.TenantString,
                new Tenant()
                {
                    Id = 1,
                    GUID = Guid.NewGuid(),
                    Name = "Sony",
                    TenantString = "sony",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Sony-logo.jpg",
                    Enable = true,
                    CreatedDateTime = DateTime.Now,
                    UpdatedDateTime = DateTime.Now
                },
                new Tenant()
                {
                    Id = 2,
                    GUID = Guid.NewGuid(),
                    Name = "Panasonic",
                    TenantString = "panasonic",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Panasonic-logo.jpg",
                    Enable = true,
                    CreatedDateTime = DateTime.Now,
                    UpdatedDateTime = DateTime.Now
                },
                new Tenant()
                {
                    Id = 3,
                    GUID = Guid.NewGuid(),
                    Name = "Samsung",
                    TenantString = "samsung",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Samsung-logo.jpg",
                    Enable = true,
                    CreatedDateTime = DateTime.Now,
                    UpdatedDateTime = DateTime.Now
                },
                new Tenant()
                {
                    Id = 4,
                    GUID = Guid.NewGuid(),
                    Name = "Toshiba",
                    TenantString = "toshiba",
                    LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Toshiba-logo.jpg",
                    Enable = true,
                    CreatedDateTime = DateTime.Now,
                    UpdatedDateTime = DateTime.Now
                }
                );
            context.SaveChanges();
        }

        private void AddUsers(PlatformProjectDBContext context)
        {
            context.Users.AddOrUpdate(
                user => user.UserName,
                new User()
                {
                    Id = 1,
                    Name = "Oliver Queen",
                    UserName = "Oliver",
                    Password = "oli@queen",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/Oliver-logo.jpg",
                    TenantId = context.Tenants.FirstOrDefault(tenant => tenant.TenantString == "sony").Id,
                    RoleId = context.Roles.FirstOrDefault(role => role.Name == "Administrator").Id
                },
                new User()
                {
                    Id = 2,
                    Name = "Sara Lance",
                    UserName = "Sara",
                    Password = "sara@lance",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/Sara-logo.jpg",
                    TenantId = context.Tenants.FirstOrDefault(tenant => tenant.TenantString == "sony").Id,
                    RoleId = context.Roles.FirstOrDefault(role => role.Name == "User").Id
                },
                new User()
                {
                    Id = 3,
                    Name = "Sony Admin",
                    UserName = "soadmin",
                    Password = "admin",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/admin.png",
                    TenantId = context.Tenants.FirstOrDefault(tenant => tenant.TenantString == "sony").Id,
                    RoleId = context.Roles.FirstOrDefault(role => role.Name == "Administrator").Id
                },
                new User()
                {
                    Id = 4,
                    Name = "Sony User",
                    UserName = "souser",
                    Password = "user",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/user.png",
                    TenantId = context.Tenants.FirstOrDefault(tenant => tenant.TenantString == "sony").Id,
                    RoleId = context.Roles.FirstOrDefault(role => role.Name == "User").Id
                },
                new User()
                {
                    Id = 5,
                    Name = "Samsung Admin",
                    UserName = "saadmin",
                    Password = "admin",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/admin.png",
                    TenantId = context.Tenants.FirstOrDefault(tenant => tenant.TenantString == "samsung").Id,
                    RoleId = context.Roles.FirstOrDefault(role => role.Name == "Administrator").Id
                },
                new User()
                {
                    Id = 6,
                    Name = "Samsung User",
                    UserName = "sauser",
                    Password = "user",
                    LogoUrl = "http://localhost:21681/Images/User/Logo/user.png",
                    TenantId = context.Tenants.FirstOrDefault(tenant => tenant.TenantString == "samsung").Id,
                    RoleId = context.Roles.FirstOrDefault(role => role.Name == "User").Id
                }
                );
            context.SaveChanges();
        }


        protected override void Seed(PlatformProjectDBContext context)
        {
            AddRoles(context);
            AddTenants(context);
            AddUsers(context);
        }
    }
}