using System;
using System.Text.Json.Serialization;

namespace API.DTOs
{
    //podría nombrarlo DTO para seguir con la misma convención que los otros
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
        
        [JsonIgnore] // con este markup no se envía al front
        public bool SenderDeleted { get; set; }
        
        [JsonIgnore]
        public bool RecipientDeleted { get; set; }
    }
} 