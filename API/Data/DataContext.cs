using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser,AppRole, int, IdentityUserClaim<int>, AppUserRole,
     IdentityUserLogin<int>,IdentityRoleClaim<int>, IdentityUserToken<int>> 
    //reemplazas dbContext por esto porque tiene las tablas necesarias para la autenticación
    //esas tablas van a usar un int como ID
    {
        //recordar que photo no tiene dbset porque no te interesa accederlas independientemente de los usuarios.
        
        public DbSet<UserLike> Likes { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DataContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder){
            //este método es para configurar relaciones y eso
            base.OnModelCreating(builder);

            //configuras la relacion entre AppUSer y UserRoles y entre AppRole y UserRoles... es una N:N
            builder.Entity<AppUser>().HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur=> ur.UserId)
            .IsRequired();

            builder.Entity<AppRole>().HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ur=> ur.RoleId)
            .IsRequired();


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

             builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
        
        }
    }
}