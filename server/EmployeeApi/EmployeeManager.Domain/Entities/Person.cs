using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManager.Domain.Entities;

[Table("People")]
public class Person : IEntity<Guid>, ICloneable
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public object Clone() => MemberwiseClone();
}
