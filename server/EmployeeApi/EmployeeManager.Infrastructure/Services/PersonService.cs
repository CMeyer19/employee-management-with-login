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

    public List<Person> GetPeople()
    {
        return _personRepository.GetAll();
    }
}
