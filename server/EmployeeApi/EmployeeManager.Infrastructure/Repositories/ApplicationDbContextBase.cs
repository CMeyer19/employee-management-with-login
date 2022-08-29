using EmployeeManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace EmployeeManager.Infrastructure.Repositories;

public class ApplicationDbContextBase : DbContext
{
    protected readonly IConfiguration _configuration;

    public DbSet<Person> People { get; set; } = null!;

    public ApplicationDbContextBase(
        DbContextOptions<ApplicationDbContextBase> contextOptions,
        IConfiguration configuration
    ) : base(contextOptions)
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
