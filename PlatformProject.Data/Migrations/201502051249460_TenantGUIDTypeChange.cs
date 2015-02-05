namespace PlatformProject.Data
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TenantGUIDTypeChange : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Tenants", "GUID", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tenants", "GUID", c => c.String());
        }
    }
}
