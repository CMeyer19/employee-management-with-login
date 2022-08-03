using Microsoft.EntityFrameworkCore;

namespace ResourceServer.Model;

public class PersonContext : DbContext
{
    public PersonContext(DbContextOptions<PersonContext> options) : base(options) { }

    public DbSet<Person> People => Set<Person>();

    protected override void OnModelCreating(ModelBuilder builder)
    { 
        builder.Entity<Person>().HasKey(m => m.Id); 
        base.OnModelCreating(builder); 
    } 
}