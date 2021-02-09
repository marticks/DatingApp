using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Group
    {
        public Group(){}

        public Group(string name)
        {
            Name = name;
        }

        [Key] // esto hace que Name sea el nombre del grupo.
        public string Name { get; set; }

        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}