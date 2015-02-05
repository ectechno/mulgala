using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using PlatformProject.Model;


namespace PlatformProject.Data
{
    public class PlatformProjectDBContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public PlatformProjectDBContext()
            : base("name=PlatformProjectAuthServerContext")
        {
        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOptional(user => user.Creator)
                .WithMany()
                .HasForeignKey(user => user.CreatorId);

            modelBuilder.Entity<User>()
                .HasOptional(user => user.Updater)
                .WithMany()
                .HasForeignKey(user => user.UpdaterId);

            modelBuilder.Entity<Tenant>()
                .HasOptional(user => user.Creator)
                .WithMany()
                .HasForeignKey(user => user.CreatorId);

            modelBuilder.Entity<Tenant>()
                .HasOptional(user => user.Updater)
                .WithMany()
                .HasForeignKey(user => user.UpdaterId);

            base.OnModelCreating(modelBuilder);
        }

    }
}
