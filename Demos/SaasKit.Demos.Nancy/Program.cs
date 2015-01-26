using System.IO;
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
        private const String HostFilePath = @"C:\Windows\System32\drivers\etc\Hosts";
        private static string OriginalHostFile = "";

        static void Main(string[] args)
        {
            var startOptions = new StartOptions();

            // Note: Add the following host entries to your host file
            //      127.0.0.1    sony.localhost
            //      127.0.0.1    samsung.localhost
            //      127.0.0.1    htc.localhost
            
            TenantList = new[] { 
                new UserTenant("Sony", 0, "sony.localhost", "127.0.0.1", 9000), 
                new UserTenant("Samsung", 1, "samsung.localhost", "127.0.0.1", 9000),
                new UserTenant("HTC", 1, "htc.localhost", "127.0.0.1", 9000),
                new UserTenant("Acer", 1, "acer.localhost", "127.0.0.1", 9000)
            };

            
            SaveOriginalHostFile(HostFilePath);
            AppendCurrentHosts(TenantList,HostFilePath);
            DisplayCurrentHostFile(HostFilePath);
            RegisterAllTenants(TenantList, startOptions);


            using (WebApp.Start<Startup>(startOptions))
            {
                Console.WriteLine("Running on {0}", string.Join(" and ", startOptions.Urls.ToArray()));
                Console.WriteLine("Press enter to exit");
                Console.ReadLine();
                RestoreOriginalHostFile(HostFilePath, OriginalHostFile);
            }
        }

        private static void RestoreOriginalHostFile(string hostFilePath, string originalHostFile)
        {
            System.IO.StreamWriter file = new System.IO.StreamWriter(hostFilePath);
            file.WriteLine(originalHostFile);

            file.Close();
            
        }

        private static void AppendCurrentHosts(UserTenant[] TenantList, string hostFilePath)
        {
            foreach (UserTenant tenant in TenantList)
            {
                string line = tenant.Ip + " " + tenant.HostName + Environment.NewLine;
                File.AppendAllText(hostFilePath, line + Environment.NewLine);

            }



        }

        private static void SaveOriginalHostFile(string hostFilePath)
        {
            OriginalHostFile = File.ReadAllText(hostFilePath);
        }

        private static void DisplayCurrentHostFile(string hostFilePath)
        {
            string[] lines = System.IO.File.ReadAllLines(hostFilePath);
            foreach (string line in lines)
            {
                // Use a tab to indent each line of the file.
                Console.WriteLine("\t" + line);
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
