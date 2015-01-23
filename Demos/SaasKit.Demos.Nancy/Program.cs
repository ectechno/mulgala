namespace SaasKit.Demos.Nancy
{
    using Microsoft.Owin.Hosting;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    class Program
    {
        static void Main(string[] args)
        {
            var startOptions = new StartOptions();
            //startOptions.Urls.Add("http://localhost:8000");
            //startOptions.Urls.Add("http://dev.local:8000");

            //In the host file, add these two hostNames
            startOptions.Urls.Add("http://t1.localhost:9000");
            startOptions.Urls.Add("http://t2.localhost:9000");
            
            using (WebApp.Start<Startup>(startOptions))
            {
                Console.WriteLine("Running on {0}", string.Join(" and ", startOptions.Urls.ToArray()));
                Console.WriteLine("Press enter to exit");
                Console.ReadLine();
            }
        }
    }
}
