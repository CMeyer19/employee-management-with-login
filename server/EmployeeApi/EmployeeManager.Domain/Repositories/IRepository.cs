using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Domain.Repositories;

public interface IRepository<TEntity, TIdentifier> where TEntity : IEntity<TIdentifier>
{
    List<TEntity> GetAll();

    TEntity Get(TIdentifier id);

    TIdentifier Add(TEntity person);

    void Update(TIdentifier id, TEntity person);

    void Delete(TIdentifier id);
}
