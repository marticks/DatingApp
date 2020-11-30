using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string  KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastActive { get; set; } = DateTime.Now;

        public string Gender{get;set;}

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public ICollection<UserLike> LikedByUsers {get;set;}

        
        public ICollection<UserLike> LikedUsers {get;set;}

        /* este método está haciendo que ne traiga todo y mapee en memoria en lugar de solo traer los campos necesarios
        //AutoMapper se da cuenta que si tiene Get en el nombre lo usa para poblar el Age del DTO
        public int GetAge(){
            return DateOfBirth.CalculateAge();
        }
        */
    }
}