namespace PlatformProject.Data
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tenants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GUID = c.String(),
                        TenantString = c.String(),
                        Name = c.String(),
                        LogoUrl = c.String(),
                        Enable = c.Boolean(nullable: false),
                        CreatedDateTime = c.DateTime(nullable: false),
                        UpdatedDateTime = c.DateTime(nullable: false),
                        CreatorId = c.Int(),
                        UpdaterId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.UpdaterId)
                .Index(t => t.CreatorId)
                .Index(t => t.UpdaterId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UserName = c.String(),
                        Password = c.String(),
                        LogoUrl = c.String(),
                        RoleId = c.Int(nullable: false),
                        TenantId = c.Int(nullable: false),
                        Tenant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Tenants", t => t.TenantId, cascadeDelete: true)
                .ForeignKey("dbo.Tenants", t => t.Tenant_Id)
                .Index(t => t.RoleId)
                .Index(t => t.TenantId)
                .Index(t => t.Tenant_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "Tenant_Id", "dbo.Tenants");
            DropForeignKey("dbo.Tenants", "UpdaterId", "dbo.Users");
            DropForeignKey("dbo.Tenants", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Users", "TenantId", "dbo.Tenants");
            DropForeignKey("dbo.Users", "RoleId", "dbo.Roles");
            DropIndex("dbo.Users", new[] { "Tenant_Id" });
            DropIndex("dbo.Users", new[] { "TenantId" });
            DropIndex("dbo.Users", new[] { "RoleId" });
            DropIndex("dbo.Tenants", new[] { "UpdaterId" });
            DropIndex("dbo.Tenants", new[] { "CreatorId" });
            DropTable("dbo.Users");
            DropTable("dbo.Tenants");
            DropTable("dbo.Roles");
        }
    }
}
