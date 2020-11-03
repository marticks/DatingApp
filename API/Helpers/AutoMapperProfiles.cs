using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>() //le das un destino, y en las opciones le aclaras de donde
            .ForMember(dest => dest.PhotoUrl
            ,opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x=> x.IsMain).Url))
            .ForMember(dest => dest.Age
            ,opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge())); // con esto puedo traerme ciertas cosas de la tabla y no todo
            
            CreateMap<Photo, PhotoDTO>();
        }
    }
}