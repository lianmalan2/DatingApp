using API.DTOs;
using API.Entities;

namespace API.Helpers
{
    public partial class MappingProfiles
    {
        protected partial void DtoToEntityMapping()
        {
            CreateMap<MemberUpdateDto, AppUser>();
        }
    }
}
