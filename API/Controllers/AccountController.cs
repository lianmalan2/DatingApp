using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private DataContext Context { get; }
        private ITokenService TokenSvc { get; }
        private IMapper Mapper { get; }

        public AccountController(DataContext context, ITokenService tokenSvc, IMapper mapper)
        {
            Context = context;
            TokenSvc = tokenSvc;
            Mapper = mapper;
        }

        private async Task<bool> UserExists(string username)
        {
            return await Context.Users.AnyAsync(user => user.UserName.Equals(username.ToLower()));
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var username = registerDto.Username.ToLower().Trim();
            if (await UserExists(username))
                return BadRequest("Username is taken");

            var user = Mapper.Map<AppUser>(registerDto);
            user.UserName = username;

            using (var hmac = new HMACSHA512())
            {
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
                user.PasswordSalt = hmac.Key;
            }

            Context.Users.Add(user);
            await Context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = TokenSvc.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var errorMessage = "Invalid Username / Password";
            var user = await Context.Users
                .Include(u => u.Photos)
                .SingleOrDefaultAsync(user => user.UserName.Equals(loginDto.Username.ToLower()));

            if (user == null)
                return Unauthorized(errorMessage);

            using (var hmac = new HMACSHA512(user.PasswordSalt))
            {
                var loginHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
                if (loginHash.Zip(user.PasswordHash).Any(h => h.First != h.Second))
                    return Unauthorized(errorMessage);
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = TokenSvc.CreateToken(user),
                PhotoUrl = user.Photos?.FirstOrDefault(p => p.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };
        }
    }
}
