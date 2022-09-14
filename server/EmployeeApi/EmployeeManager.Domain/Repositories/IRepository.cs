using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Domain.Repositories;

public interface IRepository<TEntity, TIdentifier> where TEntity : IEntity<TIdentifier>
{
    Task<List<TEntity>> GetAllAsync(CancellationToken cancellationToken);

    Task<TEntity> GetAsync(TIdentifier id, CancellationToken cancellationToken);

    Task<TIdentifier> AddAsync(TEntity person, CancellationToken cancellationToken);

    void Update(TEntity person);

    Task DeleteAsync(TIdentifier id, CancellationToken cancellationToken);
}
