using AutoMapper;

namespace API.Helpers
{
    public partial class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            EntityToDtoMapping();
            DtoToEntityMapping();
        }

        protected partial void EntityToDtoMapping();
        protected partial void DtoToEntityMapping();
    }
}
