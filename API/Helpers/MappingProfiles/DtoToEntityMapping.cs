using API.DTOs;
using API.Entities;

namespace API.Helpers
{
    public partial class MappingProfiles
    {
        protected partial void DtoToEntityMapping()
        {
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>()
                .ForMember(d => d.UserName, o => o.Ignore())
                .ForMember(d => d.PasswordHash, o => o.Ignore())
                .ForMember(d => d.PasswordSalt, o => o.Ignore());
        }
    }
}
