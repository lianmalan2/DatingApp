using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private IUserRepository UserRepo { get; }
        private IMapper Mapper { get; }
        public IPhotoService PhotoService { get; }

        public UsersController(IUserRepository userRepo, IMapper mapper, IPhotoService photoService)
        {
            UserRepo = userRepo;
            Mapper = mapper;
            PhotoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var result = await UserRepo.GetMembersAsync();

            return Ok(result);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var result = await UserRepo.GetMemberAsync(username);

            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto member)
        {
            var user = await UserRepo.GetUserByUsernameAsync(User.GetUsername());

            Mapper.Map(member, user);
            UserRepo.Update(user);

            if (await UserRepo.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Photo is required");

            var user = await UserRepo.GetUserByUsernameAsync(User.GetUsername());
            var result = await PhotoService.AddPhotoAsync(file);

            if (result.Error != null)
                return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };

            if (user.Photos.Count == 0)
                photo.IsMain = true;

            user.Photos.Add(photo);

            if (await UserRepo.SaveAllAsync())
                return CreatedAtRoute("GetUser", new { username = user.UserName }, Ok(Mapper.Map<PhotoDto>(photo)));

            return BadRequest("Problem adding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await UserRepo.GetUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo?.IsMain != false)
                return BadRequest("This is already your main photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null)
                currentMain.IsMain = false;

            photo.IsMain = true;

            if (await UserRepo.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to set main photo");
        }
    }
}
