using EmployeeManager.Domain.Interfaces;
using EmployeeManager.Infrastructure.Repositories;

namespace EmployeeManager.Infrastructure.Blah
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContextBase context;

        public UnitOfWork(ApplicationDbContextBase context)
        {
            this.context = context;
        }

        public Task SaveChangesAsync(CancellationToken token)
        {
            return context.SaveChangesAsync(token);
        }
    }
}
