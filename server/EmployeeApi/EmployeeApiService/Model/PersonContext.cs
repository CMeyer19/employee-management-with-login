using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace ResourceServer.Model;

public class PersonContext : DbContext
{
    protected readonly IConfiguration _configuration;

    public DbSet<Person> People => Set<Person>();

    public PersonContext(
        DbContextOptions<PersonContext> options,
        IConfiguration configuration
    ) : base(options)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");
        options.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}