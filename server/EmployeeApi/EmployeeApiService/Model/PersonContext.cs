using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ResourceServer.Model;

public class PersonContext : DbContext
{
    protected readonly IConfiguration Configuration;
    public DbSet<Person> People => Set<Person>();

    public PersonContext(
        DbContextOptions<PersonContext> options,
        IConfiguration configuration
    ) : base(options)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var connectionString = Configuration.GetConnectionString("DefaultConnection");
        options.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Person>().HasKey(m => m.Id);
        base.OnModelCreating(builder);
    }
}