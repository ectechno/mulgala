using SaasKit.Demos.Nancy.Data;

namespace SaasKit.Demos.Nancy
{
    using Microsoft.Owin.Hosting;
    using System;
    using System.Collections.Generic;
    using System.Linq;
   

    public class Program
    {
        public static UserTenant[] TenantList;

        static void Main(string[] args)
        {
            var startOptions = new StartOptions();

            // Note: Add the following host entries to your host file
            //      127.0.0.1    sony.localhost
            //      127.0.0.1    samsung.localhost
            
            UserTenant t1 = new UserTenant("Sony", 0, "sony.localhost", "127.0.0.1", 9000);
            UserTenant t2 = new UserTenant("Samsung", 1, "samsung.localhost", "127.0.0.1", 9000);

            TenantList = new[] {t1, t2};

            RegisterAllTenants(TenantList, startOptions);

            using (WebApp.Start<Startup>(startOptions))
            {
                Console.WriteLine("Running on {0}", string.Join(" and ", startOptions.Urls.ToArray()));
                Console.WriteLine("Press enter to exit");
                Console.ReadLine();
            }
        }

        private static void RegisterAllTenants(UserTenant[] TenantList, StartOptions startOptions)
        {
            foreach (UserTenant t in TenantList)
            {
                startOptions.Urls.Add("http://"+t.HostName+":"+t.Port);
            }
        }
    }
}
