using EmployeeManager.Domain.Entities;
using EmployeeManager.Domain.Interfaces;
using EmployeeManager.Domain.Repositories;

namespace EmployeeManager.Infrastructure.Services;

public class PersonService
{
    private readonly IRepository<Person, Guid> _personRepository;
    private readonly IUnitOfWork _unit;

    public PersonService(IRepository<Person, Guid> personRepository, IUnitOfWork unit)
    {
        _personRepository = personRepository;
        _unit = unit;
    }

    public Task<List<Person>> GetAllAsync(CancellationToken cancellationToken)
    {
        return _personRepository.GetAllAsync(cancellationToken);
    }

    public Task<Person> GetAsync(Guid id, CancellationToken cancellationToken)
    {
        return _personRepository.GetAsync(id, cancellationToken);
    }

    public async Task<Guid> AddAsync(Person person, CancellationToken cancellationToken)
    {
        var newId = await _personRepository.AddAsync(person, cancellationToken);
        await _unit.SaveChangesAsync(cancellationToken);
        return newId;
    }

    public async Task UpdateAsync(Person person, CancellationToken cancellationToken)
    {
        _personRepository.Update(person);
        await _unit.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        await _personRepository.DeleteAsync(id, cancellationToken);
        await _unit.SaveChangesAsync(cancellationToken);
    }
}
