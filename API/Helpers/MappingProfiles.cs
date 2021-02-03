using AutoMapper;

namespace API.Helpers
{
    public partial class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            EntityToDtoMapping();
        }

        protected partial void EntityToDtoMapping();
    }
}
