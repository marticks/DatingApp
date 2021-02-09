namespace API.Entities
{
    public class Connection
    {
        public Connection(){} //necesitas el default constructor para EF

        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            Username = username;
        }

        public string ConnectionId { get; set; } // por convencion si usas nombre+Id EF ya sabe que connectionID es la primary key

        public string Username { get; set; }
    }
}