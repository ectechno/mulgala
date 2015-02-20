using System.IO;
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
    using System.Net.Sockets;
    using System.Net;
    using System.Text;
   
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

        public static string SpinProgram(StartOptions startOptions, UdpClient udpServer)
        {
            /**
            * If you want to add a new tenant while program is running
            * In the command line, type these data separated by space
            *   Sony 3 sony.localhost 127.0.0.1 9000
            * all the parameters are customizable
            * **/
            string message = "";
            using (WebApp.Start<Startup>(startOptions))
            {
                Console.WriteLine("Running on {0}", string.Join(" and ", startOptions.Urls.ToArray()));
                Console.WriteLine("Press enter to exit");
                Console.WriteLine("waiting for data");
                //String line = Console.ReadLine();
                //wait for a socket message
                var remoteEP = new IPEndPoint(IPAddress.Any, 11000);
                var data = udpServer.Receive(ref remoteEP); // listen on port 11000
                Console.WriteLine(Encoding.ASCII.GetString(data));
                udpServer.Send(new byte[] { 1 }, 1, remoteEP); // reply back

                return "OK";
               

            }
            return message;


        }


        public static List<UserTenant> TenantList;
        private const String HostFilePath = @"C:\Windows\System32\drivers\etc\Hosts";
        private static string OriginalHostFile = "";
        public static Object obj = new Object();
        private static void Main(string[] args)
        {
            UdpClient udpServer = new UdpClient(11000);

            while (true)
            {
                //creating new startOptions
                var startOptions = new StartOptions();
                
                //get tenants from db
                TenantList=getTenantListFromDatabase();

                //handling host file
                SaveOriginalHostFile(HostFilePath);
                AppendCurrentHosts(TenantList, HostFilePath);
                DisplayCurrentHostFile(HostFilePath);

                //register all tenants in startoptions
                RegisterAllTenants(TenantList, startOptions);


                //Then we should spinup the program
                //program should wait for next change of the system
                //if there is a change, then the whole program will be refreshed
                //with new startoptions


                string programState = SpinProgram(startOptions, udpServer);


                //In this state, program is ready to start new instance
                RestoreOriginalHostFile(HostFilePath, OriginalHostFile);
                
            }
            
            


            
            
        
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
