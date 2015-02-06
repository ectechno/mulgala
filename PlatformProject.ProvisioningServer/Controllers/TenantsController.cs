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
    public class TenantsController : ApiController
    {
        private UnitOfWork unitOfWork;
        private IRepository<Tenant> tenantRepository;

        protected TenantsController()
        {
            unitOfWork = new UnitOfWork();
            tenantRepository = unitOfWork.GetRepository<Tenant>();
        }

        // GET api/tenants
        public IList<TenantDTO> Get()
        {
            IQueryable<Tenant> tenantList = tenantRepository.Get();
            return tenantList.Select(tenant => new TenantDTO 
            {
                Id = tenant.Id,
                Name = tenant.Name,
                TenantString = tenant.TenantString,
                LogoUrl = tenant.LogoUrl,
                Enable = tenant.Enable 
            }).ToList();
        }

        // GET api/tenants/5
        public HttpResponseMessage Get(int id)
        {
            Tenant tenant = tenantRepository.GetByID(id);

            HttpResponseMessage response;
            if (tenant == null)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                return response;
            }

            response = Request.CreateResponse(HttpStatusCode.OK, new TenantDTO
            {
                Id = tenant.Id,
                Name = tenant.Name,
                TenantString = tenant.TenantString,
                LogoUrl = tenant.LogoUrl,
                Enable = tenant.Enable
            });
            return response;
        }

        // POST api/tenants
        public HttpResponseMessage Post([FromBody]TenantDTO tenantDTO)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                Tenant tenant = tenantRepository.Insert(new Tenant 
                { 
                    Id = 0,
                    GUID = Guid.NewGuid(),
                    Name = tenantDTO.Name,
                    TenantString = tenantDTO.TenantString,
                    LogoUrl = tenantDTO.LogoUrl,
                    Enable = tenantDTO.Enable,
                    CreatedDateTime = DateTime.Now,
                    UpdatedDateTime = DateTime.Now

                    //, Note: Creator and Updater should be the current logged in user, It will be taken from the token
                    //CreatorId = 0,
                    //UpdaterId = 0
                });
                unitOfWork.Save();

                //tenantDTO.Id = tenant.Id;
                response = Request.CreateResponse(HttpStatusCode.Created, new TenantDTO
                {
                    Id = tenant.Id,
                    Name = tenant.Name,
                    TenantString = tenant.TenantString,
                    LogoUrl = tenant.LogoUrl,
                    Enable = tenant.Enable
                });
                return response;
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }
        }

        // PUT api/tenants/5
        public HttpResponseMessage Put(int id, [FromBody]TenantDTO tenantDTO)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                Tenant exTenant = tenantRepository.GetByID(id);
                exTenant.Name = tenantDTO.Name;
                exTenant.TenantString = tenantDTO.TenantString;
                exTenant.LogoUrl = tenantDTO.LogoUrl;
                exTenant.Enable = tenantDTO.Enable;
                exTenant.UpdatedDateTime = DateTime.Now;

                //, Note: Updater should be the current logged in user, It will be taken from the token
                //UpdaterId = 0

                Tenant tenant = tenantRepository.Update(exTenant);
                unitOfWork.Save();

                response = Request.CreateResponse(HttpStatusCode.OK, new TenantDTO
                {
                    Id = tenant.Id,
                    Name = tenant.Name,
                    TenantString = tenant.TenantString,
                    LogoUrl = tenant.LogoUrl,
                    Enable = tenant.Enable
                });
                return response;
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }
        }

        // DELETE api/tenants/5
        public HttpResponseMessage Delete(int id)
        {
            Tenant tenant = tenantRepository.GetByID(id);
            HttpResponseMessage response;
            if (tenant == null)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                return response;
            }

            tenantRepository.Delete(id);
            unitOfWork.Save();
            response = Request.CreateResponse(HttpStatusCode.NoContent);
            return response;
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}
