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

            // Note: Add the following host entries to your host file
            //      127.0.0.1    sony.localhost
            //      127.0.0.1    samsung.localhost
            startOptions.Urls.Add("http://sony.localhost:9000");
            startOptions.Urls.Add("http://samsung.localhost:9000");
            
            using (WebApp.Start<Startup>(startOptions))
            {
                Console.WriteLine("Running on {0}", string.Join(" and ", startOptions.Urls.ToArray()));
                Console.WriteLine("Press enter to exit");
                Console.ReadLine();
            }
        }
    }
}
