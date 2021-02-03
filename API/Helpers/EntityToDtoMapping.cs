using API.DTOs;
using API.Entities;

namespace API.Helpers
{
    public partial class MappingProfiles
    {
        protected partial void EntityToDtoMapping()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(d => d.Age, o => o.MapFrom(s => s.GetAge()));

            CreateMap<Photo, PhotoDto>();
        }
    }
}
