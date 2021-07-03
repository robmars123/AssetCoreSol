namespace Business
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    public partial class AssetDataAccess : DbContext
    {
        public AssetDataAccess()
        {
        }

        public AssetDataAccess(DbContextOptions<AssetDataAccess> options)
            : base(options)
        {
        }

        public virtual DbSet<AssetCategory> AssetCategories { get; set; }
        public virtual DbSet<Asset> Assets { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Maintenance> Maintenances { get; set; }
        public virtual DbSet<Status> Status { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Apply configurations for entity

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Asset>()
                .HasKey(k => k.Id);
        }
    }
}
