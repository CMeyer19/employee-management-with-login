using EmployeeManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeManager.Infrastructure.Mappings
{
    internal class PersonMapping : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.FirstName)
                .HasMaxLength(256)
                .IsRequired();

            builder.Property(x => x.LastName)
                .HasMaxLength(256)
                .IsRequired();
        }
    }
}