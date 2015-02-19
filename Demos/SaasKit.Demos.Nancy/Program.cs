﻿using System.IO;
using SaasKit.Demos.Nancy.Data;

namespace SaasKit.Demos.Nancy
{
    using Microsoft.Owin.Hosting;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Net.Http.Headers;
using System.Threading;
   
    /*
     The class that used to load data object from REST api
     
     */
    public class DataObject
    {
        public string TenantString { get; set; }
        public string Name { get; set; }
        //public int Id { get; set; }
    }






    public class Program
    {
        

        private static List<UserTenant> getTenantListFromDatabase()
        {
            string URL = "http://localhost:44552/api/tenants";
            string urlParameters = "";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            // List data response.
            HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call!

            List<UserTenant> TenantList = new List<UserTenant>();

            Console.WriteLine(response);
            if (response.IsSuccessStatusCode)
            {
                // Parse the response body. Blocking!
                var dataObjects = response.Content.ReadAsAsync<IEnumerable<DataObject>>().Result;
                foreach (var d in dataObjects)
                {
                    Console.WriteLine("{0} {1}", d.Name, d.TenantString);
                    //adding details to tenant list
                    TenantList.Add(new UserTenant(d.Name, 0, d.TenantString+".localhost", "127.0.0.1", 9000));

                }

            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return TenantList;
        }

        public static void SpinProgram(StartOptions startOptions)
        {
            /**
            * If you want to add a new tenant while program is running
            * In the command line, type these data separated by space
            *   Sony 3 sony.localhost 127.0.0.1 9000
            * all the parameters are customizable
            * **/

            using (WebApp.Start<Startup>(startOptions))
            {
                Console.WriteLine("Running on {0}", string.Join(" and ", startOptions.Urls.ToArray()));
                Console.WriteLine("Press enter to exit");
                String line = Console.ReadLine();
                if (line == "")
                {
                    RestoreOriginalHostFile(HostFilePath, OriginalHostFile);
                    return;
                }
                else
                {
                    try
                    {
                        string[] dataInput = line.Split(' ');
                        UserTenant newUserTenant = new UserTenant(dataInput[0], Convert.ToInt32(dataInput[1]),
                            dataInput[2], dataInput[3], Convert.ToInt32(dataInput[4]));

                        //Adding tenants when program is running
                        AddNewTenant(TenantList, newUserTenant, HostFilePath, startOptions);
                    }
                    catch (Exception)
                    {

                        throw;
                    }
                }

            }


        }



        //public static UserTenant[] TenantList;
        public static List<UserTenant> TenantList;
        private const String HostFilePath = @"C:\Windows\System32\drivers\etc\Hosts";
        private static string OriginalHostFile = "";

        private static void Main(string[] args)
        {
            var startOptions = new StartOptions();

            // Note: Add the following host entries to your host file
            //      127.0.0.1    sony.localhost
            //      127.0.0.1    samsung.localhost
            //      127.0.0.1    htc.localhost


            TenantList = new List<UserTenant>();

            //TenantList.Add(new UserTenant("Sony", 0, "sony.localhost", "127.0.0.1", 9000));
            //TenantList.Add(new UserTenant("Samsung", 1, "samsung.localhost", "127.0.0.1", 9000));
            //TenantList.Add(new UserTenant("HTC", 1, "htc.localhost", "127.0.0.1", 9000));
            //TenantList.Add(new UserTenant("Acer", 1, "acer.localhost", "127.0.0.1", 9000));
            TenantList=getTenantListFromDatabase();

            


            SaveOriginalHostFile(HostFilePath);
            AppendCurrentHosts(TenantList, HostFilePath);
            DisplayCurrentHostFile(HostFilePath);
            RegisterAllTenants(TenantList, startOptions);
            SpinProgram(startOptions);
           


            
            
        
    }

        private static void AddNewTenant(List<UserTenant> tenantList, UserTenant newUserTenant, string hostFilePath, StartOptions startOptions)
        {
            tenantList.Add(newUserTenant);
            AddnewHost(hostFilePath,newUserTenant);
            DisplayCurrentHostFile(hostFilePath);

            //registering the new tenant
            startOptions.Urls.Add("http://" + newUserTenant.HostName + ":" + newUserTenant.Port);

        }

        private static void AddnewHost(string hostFilePath, UserTenant newUserTenant)
        {
            string line = newUserTenant.Ip + " " + newUserTenant.HostName + Environment.NewLine;
            File.AppendAllText(hostFilePath, line + Environment.NewLine);
        }

        private static void RestoreOriginalHostFile(string hostFilePath, string originalHostFile)
        {
            System.IO.StreamWriter file = new System.IO.StreamWriter(hostFilePath);
            file.WriteLine(originalHostFile);

            file.Close();
            
        }

        private static void AppendCurrentHosts(List<UserTenant> TenantList, string hostFilePath)
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

        private static void RegisterAllTenants(List<UserTenant> TenantList, StartOptions startOptions)
        {
            foreach (UserTenant t in TenantList)
            {
                startOptions.Urls.Add("http://"+t.HostName+":"+t.Port);
            }
        }
    }
}
