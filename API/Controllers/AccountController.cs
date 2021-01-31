using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private DataContext Context { get; }
        public AccountController(DataContext context)
        {
            Context = context;
        }

        private async Task<bool> UserExists(string username)
        {
            return await Context.Users.AnyAsync(user => user.UserName.Equals(username));
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register([FromBody] RegisterDto inputUser)
        {
            var username = inputUser.Username.ToLower().Trim();
            if (await UserExists(username))
                return BadRequest("Username is taken");

            using (var hmac = new HMACSHA512())
            {
                var user = new AppUser
                {
                    UserName = username,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(inputUser.Password)),
                    PasswordSalt = hmac.Key,
                };

                Context.Users.Add(user);
                await Context.SaveChangesAsync();

                return user;
            }
        }
    }
}
