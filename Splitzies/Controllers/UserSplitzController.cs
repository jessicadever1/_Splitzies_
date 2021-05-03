using Microsoft.AspNetCore.Mvc;
using Splitzies.Repositories;
using System.Security.Claims;
using Splitzies.Models;
using Microsoft.AspNetCore.Authorization;

namespace Splitzies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserSplitzController : ControllerBase
    {
        private readonly IUserSplitzRepository _userSplitzRepository;
        private readonly ISplitzRepository _splitzRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userSplitz = _userSplitzRepository.GetUserProfilesByUserSplitzId(id);
            if (userSplitz == null)
            {
                return NotFound();
            }
            return Ok(userSplitz);

        }
    }
}
