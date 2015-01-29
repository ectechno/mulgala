using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PlatformProject.API.Models;
using PlatformProject.API.DAL;
using System.Security.Claims;

namespace PlatformProject.API.Controllers
{

    public class ProductsController : ApiController
    {
        private string tenantID;
        private UnitOfWork unitOfWork = new UnitOfWork();


        // GET: api/Products
        [Authorize(Users = "Oliver,Sara")]
        public IEnumerable<Product> GetProducts()
        {
            this.setTenantID();
            return unitOfWork.ProductRepository.Get();
        }

        // GET: api/Products/5
        [Authorize(Users = "Oliver")]
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            this.setTenantID();
            Product product = unitOfWork.ProductRepository.GetByID(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            this.setTenantID();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ID)
            {
                return BadRequest();
            }


            try
            {
                unitOfWork.ProductRepository.Update(product);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            this.setTenantID();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.ProductRepository.Insert(product);
            unitOfWork.Save();

            return CreatedAtRoute("DefaultApi", new { id = product.ID }, product);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            this.setTenantID();
            Product product = unitOfWork.ProductRepository.GetByID(id);
            if (product == null)
            {
                return NotFound();
            }
            unitOfWork.ProductRepository.Delete(id);
            unitOfWork.Save();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            this.setTenantID();
            return unitOfWork.ProductRepository.GetByID(id) != null;
        }

        private void setTenantID()
        {
            var identity = User.Identity as ClaimsIdentity;
            this.tenantID = identity.Claims.FirstOrDefault(c => c.Type == "urn:oauth:tenant").Value.ToString();
            this.unitOfWork.tenantID = tenantID;
        }
    }
}