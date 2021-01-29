using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /// <summary>
    /// Run "dotnet tool install --global dotnet-ef --version 5.0.2"
    /// dotnet-ef migrations add [name] -o Data/Migrations
    /// </summary>
    public class DataContext : DbContext
    {
        public DbSet<AppUser> Users { get; set; }

        public DataContext(DbContextOptions options)
            : base(options)
        {
        }
    }
}
