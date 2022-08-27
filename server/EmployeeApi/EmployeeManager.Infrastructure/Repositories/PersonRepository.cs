using EmployeeManager.Domain.Entities;
using EmployeeManager.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Repositories;

public class PersonRepository : DbContext, Repository<Person, Guid>, IPersonRepository
{

}