using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private DataContext Context { get; }
        private IMapper Mapper { get; }

        public UserRepository(DataContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }

        public void Update(AppUser user)
        {
            Context.Entry(user).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await Context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await Context.Users
                .Include(u => u.Photos)
                .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await Context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await Context.Users
                .Include(u => u.Photos)
                .SingleOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await Context.Users
                .ProjectTo<MemberDto>(Mapper.ConfigurationProvider)
                .ToListAsync(); ;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await Context.Users
                .Where(u => u.UserName == username)
                .ProjectTo<MemberDto>(Mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
    }
}
