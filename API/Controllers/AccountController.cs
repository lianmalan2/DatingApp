using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private DataContext Context { get; }
        public AccountController(DataContext context)
        {
            Context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(/*[FromQuery]*/ string username, /*[FromQuery]*/ string password)
        {
            using (var hmac = new HMACSHA512())
            {
                var user = new AppUser
                {
                    UserName = username,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                    PasswordSalt = hmac.Key,
                };

                Context.Users.Add(user);
                await Context.SaveChangesAsync();

                return user;
            }
        }
    }
}
