using PlatformProject.Data;
using PlatformProject.DTO;
using PlatformProject.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PlatformProject.ProvisioningServer.Controllers
{
    public class UserDetailsController : ApiController
    {
        private UnitOfWork unitOfWork;
        private IRepository<User> userRepository;
        private IRepository<Tenant> tenantRepository;
        private IRepository<Role> roleRepository;

        protected UserDetailsController()
        {
            unitOfWork = new UnitOfWork();
            userRepository = unitOfWork.GetRepository<User>();
            tenantRepository = unitOfWork.GetRepository<Tenant>();
            roleRepository = unitOfWork.GetRepository<Role>();
        }

        // GET api/userDetails/5
        [Route("~/api/userdetails/{tenantString}/{userString}")]
        public HttpResponseMessage Get(string tenantString,string userString)
        {
            

            HttpResponseMessage response;
            

            response = Request.CreateResponse(HttpStatusCode.OK, new UserDTO
            {

                Name = userString,

                Tenant = tenantString
            });
            return response;



        }

    }
}
