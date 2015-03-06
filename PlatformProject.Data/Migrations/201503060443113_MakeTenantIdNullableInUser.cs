namespace PlatformProject.Data
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MakeTenantIdNullableInUser : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Users", "TenantId", "dbo.Tenants");
            DropIndex("dbo.Users", new[] { "TenantId" });
            AlterColumn("dbo.Users", "TenantId", c => c.Int());
            CreateIndex("dbo.Users", "TenantId");
            AddForeignKey("dbo.Users", "TenantId", "dbo.Tenants", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "TenantId", "dbo.Tenants");
            DropIndex("dbo.Users", new[] { "TenantId" });
            AlterColumn("dbo.Users", "TenantId", c => c.Int(nullable: false));
            CreateIndex("dbo.Users", "TenantId");
            AddForeignKey("dbo.Users", "TenantId", "dbo.Tenants", "Id", cascadeDelete: true);
        }
    }
}
