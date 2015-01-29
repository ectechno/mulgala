namespace PlatformProject.API.Migrations
{
    using PlatformProject.API.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PlatformProject.API.DAL.PlatformProjectAPIContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(PlatformProject.API.DAL.PlatformProjectAPIContext context)
        {
            Product product1 = new Product { Name = "Xperia A", Category = "Phones", Price = 2000, TenantID = "Sony" };
            Product product2 = new Product { Name = "Xperia B", Category = "Phones", Price = 3000, TenantID = "Sony" };
            Product product3 = new Product { Name = "Xperia C", Category = "Phones", Price = 4000, TenantID = "Sony" };
            Product product4 = new Product { Name = "Xperia D", Category = "Phones", Price = 5000, TenantID = "Sony" };
            Product product5 = new Product { Name = "Galaxy A", Category = "Phones", Price = 6000, TenantID = "Samsung" };
            Product product6 = new Product { Name = "Galaxy B", Category = "Phones", Price = 4000, TenantID = "Samsung" };
            Product product7 = new Product { Name = "Galaxy C", Category = "Phones", Price = 2000, TenantID = "Samsung" };
            Product product8 = new Product { Name = "Galaxy D", Category = "Phones", Price = 1000, TenantID = "Samsung" };
            IList<Product> defaultProducts = new List<Product>();

            defaultProducts.Add(product1);
            defaultProducts.Add(product2);
            defaultProducts.Add(product3);
            defaultProducts.Add(product4);
            defaultProducts.Add(product5);
            defaultProducts.Add(product6);
            defaultProducts.Add(product7);
            defaultProducts.Add(product8);


            foreach (var product in defaultProducts)
            {
                context.Products.AddOrUpdate(p => p.ID, product);
            }
        }
    }
}
