﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.Data
{
    public class Repository<Entity> : IRepository<Entity> where Entity : class
    {
        internal PlatformDBContext dbContext;
        internal DbSet<Entity> dbSet;

        public Repository(PlatformDBContext context)
        {
            dbContext = context;
            dbSet = context.Set<Entity>();
        }

        public virtual IQueryable<Entity> Get()
        {
            return dbSet;
        }

        public virtual IQueryable<Entity> Find(Expression<Func<Entity, bool>> predicate) 
        {
            return dbSet.Where(predicate);
        }

        public virtual Entity GetByID(int id)
        {
            return dbSet.Find(id);
        }

        public virtual Entity Insert(Entity entity)
        {
            return dbSet.Add(entity);
        }

        public virtual Entity Update(Entity entityToUpdate)
        {
            //dbSet.Attach(entityToUpdate);
            dbContext.Entry(entityToUpdate).State = EntityState.Modified;
            return entityToUpdate;
        }

        public virtual void Delete(Entity entityToDelete)
        {
            if (dbContext.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void Delete(int id)
        {
            Entity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }
    }
}
