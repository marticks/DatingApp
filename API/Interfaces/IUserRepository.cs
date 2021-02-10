using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user); // no es async porque solo actualiza el tracking en EF y luego se acutaliza todo con el saveall

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<PagedList<MemberDTO>> getMembersAsync(UserParams userParams);

        Task<MemberDTO> GetMemberAsync(string username);

        Task<string> GetUserGender(string username);
    }
}