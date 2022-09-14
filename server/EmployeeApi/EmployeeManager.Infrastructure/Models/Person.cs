namespace EmployeeManager.Infrastructure.Models;

public class Person
{
    public Guid? Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}
