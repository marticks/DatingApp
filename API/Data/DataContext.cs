using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        //recordar que photo no tiene dbset porque no te interesa accederlas independientemente de los usuarios.

        public DbSet<AppUser> Users { get; set; }
        
        public DbSet<UserLike> Likes { get; set; }

        public DataContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder){
            //este método es para configurar relaciones y eso
            base.OnModelCreating(builder);

            builder.Entity<UserLike>().HasKey(k => new {k.SourceUserId, k.LikedUserId}); 
            // esto es poruqe no le definimos una primary key nosotros
            
            builder.Entity<UserLike>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
            .HasOne(s => s.LikedUser)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.LikedUserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        }
    }
}