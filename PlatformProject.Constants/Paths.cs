using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.Constants
{
    public static class Paths
    {
        /// <summary>
        /// AuthorizationServer project should run on this URL
        /// </summary>
        public const string AuthorizationServerBaseAddress = "http://localhost:21681";

        /// <summary>
        /// ResourceServer project should run on this URL
        /// </summary>
        public const string ResourceServerBaseAddress = "http://localhost:48846";

        /// <summary>
        /// ImplicitGrant project should be running on this specific port '38515'
        /// </summary>
        public const string ImplicitGrantCallBackPathT1 = "http://sony.localhost:9000/SignIn";
        public const string ImplicitGrantCallBackPathT2 = "http://samsung.localhost:9000/SignIn";
        public const string ImplicitGrantCallBackPathT3 = "http://toshiba.localhost:9000/SignIn";
        public const string ImplicitGrantCallBackPathT4 = "http://localhost:50680/SignIn.html";
        public const string ImplicitGrantCallBackPathT5 = "http://localhost:40838/SignIn.html";
        public const string ImplicitGrantCallBackPathT6 = "http://localhost:23657/SignIn.html";
              
        /// <summary>
        /// AuthorizationCodeGrant project should be running on this URL.
        /// </summary>
        public const string AuthorizeCodeCallBackPath = "http://localhost:38500/";

        public const string AuthorizePath = "/OAuth/Authorize";
        public const string TokenPath = "/OAuth/Token";
        public const string LoginPath = "/Account/Login";
        public const string LogoutPath = "/Account/Logout";
        public const string MePath = "/api/Me";
    }
}
