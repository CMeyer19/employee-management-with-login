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

    public Task<List<TEntity>> GetAllAsync(CancellationToken cancellationToken)
    {
        return _collection.ToListAsync(cancellationToken);
    }

    public async Task<TEntity> GetAsync(TId id, CancellationToken cancellationToken)
    {
        var person = await _collection.FirstOrDefaultAsync(t => t.Id.Equals(id));
        if (person is null) throw new Exception("A person with this identifier could not be found");

        return person;
    }

    public async Task<TId> AddAsync(TEntity person, CancellationToken cancellationToken)
    {
        await _collection.AddAsync(person, cancellationToken);
        return person.Id;
    }

    public void Update(TEntity person)
    {
        _collection.Update(person);
    }

    public async Task DeleteAsync(TId id, CancellationToken cancellationToken)
    {
        var entity = await _collection.FirstOrDefaultAsync(t => t.Id.Equals(id));
        if (entity is null) throw new Exception("A person with this identifier could not be found");

        _collection.Remove(entity); 
    }
}
