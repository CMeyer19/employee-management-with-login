using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Domain.Repositories;

public interface IRepository<TEntity, in TIdentifier> where TEntity : IEntity<TIdentifier>
{
}
