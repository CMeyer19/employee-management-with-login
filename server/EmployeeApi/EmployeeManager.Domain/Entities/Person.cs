namespace EmployeeManager.Domain.Entities;

public class Person : IEntity<Guid>, ICloneable
{
    public Person() { }

    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public object Clone() => MemberwiseClone();
}
