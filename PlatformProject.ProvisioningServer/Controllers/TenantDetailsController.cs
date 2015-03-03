using PlatformProject.Data;
using PlatformProject.DTO;
using PlatformProject.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using System.Web.Http;

namespace PlatformProject.ProvisioningServer.Controllers
{
    public class TenantDetailsController : ApiController
    {
        private UnitOfWork unitOfWork;
        private IRepository<Tenant> tenantRepository;


        protected TenantDetailsController()
        {
            unitOfWork = new UnitOfWork();
            tenantRepository = unitOfWork.GetRepository<Tenant>();
        }

        // GET api/tenantdetails/sony
        [Route("~/api/tenantdetails/{tenantString}")]
        public HttpResponseMessage Get(string tenantString)
        {
            //Tenant tenant = tenantRepository.GetByID(id);
            var tenantData = tenantRepository.Find(tenant => tenant.TenantString == tenantString).FirstOrDefault();


            HttpResponseMessage response;
            if (tenantData == null)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not found");
                return response;
            }

            response = Request.CreateResponse(HttpStatusCode.OK, new TenantDTO
            {
                Id = tenantData.Id,
                Name = tenantData.Name,
                TenantString = tenantData.TenantString,
                LogoUrl = tenantData.LogoUrl,
                Enable = tenantData.Enable
            });
            return response;
        }
    }
}