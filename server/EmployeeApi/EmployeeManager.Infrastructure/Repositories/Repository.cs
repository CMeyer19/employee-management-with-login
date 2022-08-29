using EmployeeManager.Domain.Entities;
using EmployeeManager.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Repositories;

public class Repository<TEntity, TId> : IRepository<TEntity, TId> where TEntity : class, IEntity<TId> where TId : IEquatable<TId>
{
    private readonly ApplicationDbContextBase _context;
    private DbSet<TEntity> _collection => _context.Set<TEntity>();

    public Repository(
        ApplicationDbContextBase context
    )
    {
        _context = context;
    }

    public List<TEntity> GetAll()
    {
        var data = _collection.ToList();

        return data;
    }

    public TEntity Get(TId id)
    {
        var person = _collection.First(t => t.Id.Equals(id));
        if (person is null) throw new Exception("A person with this identifier could not be found");

        return person;
    }

    public TId Add(TEntity person)
    {
        _collection.Add(person);
        return person.Id;
    }

    public void Update(TId id, TEntity person)
    {
        _collection.Update(person);
    }

    public void Delete(TId id)
    {
        var entity = _collection.First(t => t.Id.Equals(id));
        _collection.Remove(entity);
    }
}
