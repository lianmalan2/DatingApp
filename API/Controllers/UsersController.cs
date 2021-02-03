using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private IUserRepository UserRepo { get; }
        private IMapper Mapper { get; }

        public UsersController(IUserRepository userRepo, IMapper mapper)
        {
            UserRepo = userRepo;
            Mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var result = await UserRepo.GetMembersAsync();

            return Ok(result);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var result = await UserRepo.GetMemberAsync(username);

            return Ok(result);
        }
    }
}
