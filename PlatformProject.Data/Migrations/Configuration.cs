namespace PlatformProject.Data
{
    using PlatformProject.Model;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PlatformProject.Data.PlatformProjectDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "PlatformProject.AuthServer.Models.PlatformProjectAuthServerContext";
        }

        protected override void Seed(PlatformProject.Data.PlatformProjectDBContext context)
        {
            //Seeding Initial tenants
            Tenant tenant1 = new Tenant { ID = 1, GUID = "7f42acd7-067c-4c82-834e-021d4c0132e0", Name = "Sony", TenantString = "sony", LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Sony-logo.jpg" };
            Tenant tenant2 = new Tenant { ID = 2, GUID = "f70115e9-f644-4ba9-bcf6-2c1692d986e9", Name = "Panasonic", TenantString = "panasonic", LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Panasonic-logo.jpg" };
            Tenant tenant3 = new Tenant { ID = 3, GUID = "9168e6d4-6600-4f3b-9cab-d10e44f75500", Name = "Samsung", TenantString = "samsung", LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Samsung-logo.jpg" };
            Tenant tenant4 = new Tenant { ID = 4, GUID = "a66c80cd-0ba9-4261-b44a-6fc522fc6501", Name = "Toshiba", TenantString = "toshiba", LogoUrl = "http://localhost:21681/Images/Tenants/Logo/Toshiba-logo.jpg" };

            IList<Tenant> defaultTenants = new List<Tenant>();

            defaultTenants.Add(tenant1);
            defaultTenants.Add(tenant2);
            defaultTenants.Add(tenant3);
            defaultTenants.Add(tenant4);

            foreach (var tenant in defaultTenants)
            {
                 context.Tenants.AddOrUpdate(t => t.ID, tenant);
            }

            //Seeding Initial users
            User user1 = new User { ID = 1, Name = "Oliver Queen", UserName = "Oliver", Password = "oli@queen", LogoUrl = "http://localhost:21681/Images/User/Logo/Oliver-logo.jpg", Tenant = tenant1 };
            User user2 = new User { ID = 2, Name = "Sara Lance", UserName = "Sara", Password = "sara@lance", LogoUrl = "http://localhost:21681/Images/User/Logo/Sara-logo.jpg", Tenant = tenant1 };
            User user3 = new User { ID = 3, Name = "User3", UserName = "User3", Password = "Password3", Tenant = tenant1 };
            User user4 = new User { ID = 4, Name = "User4", UserName = "User4", Password = "Password4", Tenant = tenant2 };
            User user5 = new User { ID = 5, Name = "User5", UserName = "User5", Password = "Password5", Tenant = tenant2 };
            User user6 = new User { ID = 6, Name = "User6", UserName = "User6", Password = "Password6", Tenant = tenant2 };
            User user7 = new User { ID = 7, Name = "User7", UserName = "User7", Password = "Password7", Tenant = tenant3 };
            User user8 = new User { ID = 8, Name = "User8", UserName = "User8", Password = "Password8", Tenant = tenant3 };
            User user9 = new User { ID = 9, Name = "User9", UserName = "User9", Password = "Password9", Tenant = tenant3 };
            User user10 = new User { ID = 10, Name = "User10", UserName = "User10", Password = "Password10", Tenant = tenant4 };
            User user11 = new User { ID = 11, Name = "User11", UserName = "User11", Password = "Password11", Tenant = tenant4 };
            User user12 = new User { ID = 12, Name = "User12", UserName = "User12", Password = "Password12", Tenant = tenant4 };

            IList<User> defaultUsers = new List<User>();

            defaultUsers.Add(user1);
            defaultUsers.Add(user2);
            defaultUsers.Add(user3);
            defaultUsers.Add(user4);
            defaultUsers.Add(user5);
            defaultUsers.Add(user6);
            defaultUsers.Add(user7);
            defaultUsers.Add(user8);
            defaultUsers.Add(user9);
            defaultUsers.Add(user10);
            defaultUsers.Add(user11);
            defaultUsers.Add(user12);

            foreach (var user in defaultUsers)
            {
                context.Users.AddOrUpdate(u => u.ID, user);
            }

            context.SaveChanges();
        }
    }
}
