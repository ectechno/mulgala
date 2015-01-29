using PlatformProject.API.Models;
using System;


namespace PlatformProject.API.DAL
{
    public class UnitOfWork : IDisposable
    {
        public string tenantID{ set; get;}
        private PlatformProjectAPIContext context = new PlatformProjectAPIContext();
        private GenericRepository<Product> productRepository;


        public GenericRepository<Product> ProductRepository
        {
            get
            {

                if (this.productRepository == null)
                {
                    this.productRepository = new GenericRepository<Product>(context, tenantID);
                }
                return productRepository;
            }
        }

        public System.Data.Entity.Database Database
        {
            get
            {

                if (this.context == null)
                {
                    this.context = new PlatformProjectAPIContext();
                }
                return context.Database;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}