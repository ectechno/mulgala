using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.Constants
{
    public static class Clients
    {
        public readonly static Client Client1 = new Client
        {
            Id = "123456",
            Secret = "abcdef",
            RedirectUrl = Paths.AuthorizeCodeCallBackPath
        };

        public readonly static Client ImplicitGrantClient = new Client
        {
            Id = "7890ab",
            Secret = "7890ab",
            RedirectUrls = new List<string> { 
                Paths.ImplicitGrantCallBackPathT1, 
                Paths.ImplicitGrantCallBackPathT2,
                Paths.ImplicitGrantCallBackPathT3,
                Paths.ImplicitGrantCallBackPathT4
            }
        };

    }

    public class Client
    {
        public string Id { get; set; }
        public string Secret { get; set; }
        public string RedirectUrl { get; set; }
        public IList<string> RedirectUrls { get; set; }
    }
}
