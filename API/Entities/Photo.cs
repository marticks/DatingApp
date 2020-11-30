using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    //para que la tabla se llame asi y no photo(hay que hacer esto porque esta clase no tiene dbset porque no te interesa 
    //acceder a las photos de a una como servicio, sino que las tratas como colección)
    [Table("Photos")]
    public class Photo
    {

        public int Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; } // este es el Id de cloudinary

        public AppUser AppUser { get; set; }

        public int AppUserId { get; set; }

        //a esto se le llama "fully defining the relationship"
    }
}