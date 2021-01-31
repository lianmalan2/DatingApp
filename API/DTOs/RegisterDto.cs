using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [MinLength(8, ErrorMessage = "Password minimum length is 8 characters")]
        public string Password { get; set; }
    }
}
