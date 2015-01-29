using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;
using PlatformProject.API.Models;
using System.Linq.Expressions;

namespace PlatformProject.API.DAL
{
    public class GenericRepository<TEntity> where TEntity :class,ITenant
    {
        internal PlatformProjectAPIContext context;
        internal DbSet<TEntity> dbSet;
        internal IQueryable<TEntity> dbQuery;
        internal string tenantID; 

        public GenericRepository(PlatformProjectAPIContext context,string tenantID)
        {
            this.tenantID = tenantID;
            this.context = context;
            this.dbSet = context.Set<TEntity>();
            this.dbQuery = context.Set<TEntity>().Where(t => t.TenantID.Equals(tenantID));
        }

        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbQuery;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public virtual TEntity GetByID(object id)
        {
            return dbQuery.FirstOrDefault(e=> e.ID.Equals(id));
        }

        public virtual void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public virtual void Delete(object id)
        {
            TEntity entityToDelete = dbQuery.FirstOrDefault(e => e.ID.Equals(id));
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }
    }
}