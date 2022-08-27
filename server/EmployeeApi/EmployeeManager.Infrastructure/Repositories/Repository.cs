using EmployeeManager.Domain.Entities;
using EmployeeManager.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Repositories
{
    public class Repository<TEntity, TId> : DbContext, IRepository<TEntity, TId> where TEntity : class, IEntity<TId>
    {
        public Repository()
        {

        }
    }
}
