using PlatformProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PlatformProject.ProvisioningServer.Controllers
{
    public class BaseController<Entity> : ApiController where Entity : class
    {
        private UnitOfWork unitOfWork;
        private IRepository<Entity> genericRepository;

        public BaseController() 
        {
            unitOfWork = new UnitOfWork();
            genericRepository = unitOfWork.GetRepository<Entity>();
        }

        // GET api/entity
        public virtual IList<Entity> Get()
        {
            return genericRepository.Get().ToList();
        }

        // GET api/entity/5
        public virtual HttpResponseMessage Get(int id)
        {
            Entity entity = genericRepository.GetByID(id);

            HttpResponseMessage response;
            if (entity == null)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                return response;
            }

            response = Request.CreateResponse(HttpStatusCode.OK, entity);
            return response;
        }

        // POST api/entity
        public virtual HttpResponseMessage Post([FromBody]Entity entity)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                Entity newEntity = genericRepository.Insert(entity);
                unitOfWork.Save();

                response = Request.CreateResponse(HttpStatusCode.Created, newEntity);
                return response;
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }
        }

        // PUT api/entity/5
        public virtual HttpResponseMessage Put(int id, [FromBody]Entity entity)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                Entity updatedEntity = genericRepository.Update(entity);
                unitOfWork.Save();

                response = Request.CreateResponse(HttpStatusCode.OK, updatedEntity);
                return response;
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }
        }

        // DELETE api/entity/5
        public virtual HttpResponseMessage Delete(int id)
        {
            Entity entity = genericRepository.GetByID(id);
            HttpResponseMessage response;
            if (entity == null)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                return response;
            }

            genericRepository.Delete(id);
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
