using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.Data
{
    public interface IRepository<Entity> where Entity : class
    {

        IQueryable<Entity> Get();

        IQueryable<Entity> Find(Expression<Func<Entity, bool>> predicate);

        Entity GetByID(int id);

        Entity Insert(Entity entity);

        Entity Update(Entity entityToUpdate);

        void Delete(int id);

        void Delete(Entity entityToDelete);

    }
}
