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
            //startOptions.Urls.Add("http://localhost:8000");
            //startOptions.Urls.Add("http://dev.local:8000");

            //In the host file, add these two hostNames
            //startOptions.Urls.Add("http://t1.localhost:9000");
            //startOptions.Urls.Add("http://t2.localhost:9000");


            UserTenant t1 = new UserTenant("Tenant1", 0, "t1.localhost", "127.0.0.1", 9000);
            UserTenant t2 = new UserTenant("Tenant2", 1, "t2.localhost", "127.0.0.1", 9000);

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
