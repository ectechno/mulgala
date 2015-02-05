using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.Data
{
    public interface IRepository<Entity> where Entity : class
    {

        IQueryable<Entity> Get();

        Entity GetByID(int id);

        Entity Insert(Entity entity);

        Entity Update(Entity entityToUpdate);

        void Delete(int id);

        void Delete(Entity entityToDelete);

    }
}
