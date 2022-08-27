namespace EmployeeManager.Domain.Entities;

public interface IEntity { }

public interface IEntity<TIdentifier> : IEntity
{
    TIdentifier Id { get; set; }
}
