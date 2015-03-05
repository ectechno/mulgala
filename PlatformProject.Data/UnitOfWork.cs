using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private PlatformDBContext dbContext = new PlatformDBContext();

        public IRepository<Entity> GetRepository<Entity>() where Entity : class
        {
            return new Repository<Entity>(dbContext);
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                dbContext.Dispose();
            }
        }

    }
}
