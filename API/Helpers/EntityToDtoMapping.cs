using API.DTOs;
using API.Entities;

namespace API.Helpers
{
    public partial class MappingProfiles
    {
        protected partial void EntityToDtoMapping()
        {
            CreateMap<AppUser, MemberDto>();

            CreateMap<Photo, PhotoDto>();
        }
    }
}
