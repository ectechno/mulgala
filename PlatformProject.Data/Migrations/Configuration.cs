namespace PlatformProject.Data
{
    using PlatformProject.Model;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PlatformProject.AuthServer.Models.PlatformProjectAuthServerContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "PlatformProject.AuthServer.Models.PlatformProjectAuthServerContext";
        }

        protected override void Seed(PlatformProject.AuthServer.Models.PlatformProjectAuthServerContext context)
        {
            //Seeding Initial tenants
            Tenant tenant1 = new Tenant { ID = 1, GUID = "abc123", Name = "Sony", TenantString = "Sony123" };
            Tenant tenant2 = new Tenant { ID = 2, GUID = "bcd123", Name = "Panasonic", TenantString = "Panasonic123" };
            Tenant tenant3 = new Tenant { ID = 3, GUID = "cde123", Name = "Samsung", TenantString = "Samsung123" };
            Tenant tenant4 = new Tenant { ID = 4, GUID = "def123", Name = "Toshiba", TenantString = "Toshiba123" };

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
            User user1 = new User { ID = 1, Name = "User1", UserName = "User1", Password = "Password1", Tenant = tenant1 };
            User user2 = new User { ID = 2, Name = "User2", UserName = "User2", Password = "Password2", Tenant = tenant1 };
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
