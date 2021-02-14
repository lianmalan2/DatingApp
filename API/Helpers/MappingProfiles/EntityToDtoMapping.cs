using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;

namespace API.Helpers
{
    public partial class MappingProfiles
    {
        protected partial void EntityToDtoMapping()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Photo, PhotoDto>();
        }
    }
}
