using Microsoft.EntityFrameworkCore;
using BackendSecurite.Models;

namespace BackendSecurite.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<ServiceRequest> ServiceRequests { get; set; }
        public DbSet<Utilisateur> Utilisateurs { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<PanierItem> PanierItems { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurer la relation Utilisateur - ServiceRequests
            modelBuilder.Entity<ServiceRequest>()
                .HasOne(sr => sr.Utilisateur)
                .WithMany(u => u.ServiceRequests)
                .HasForeignKey(sr => sr.UtilisateurId)
                .OnDelete(DeleteBehavior.Cascade);

 


        }
    }
}
    
