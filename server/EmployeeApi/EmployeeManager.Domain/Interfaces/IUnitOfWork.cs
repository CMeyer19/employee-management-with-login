namespace EmployeeManager.Domain.Interfaces;

public interface IUnitOfWork
{
    Task SaveChangesAsync(CancellationToken token);
}
