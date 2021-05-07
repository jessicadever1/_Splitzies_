using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Splitzies.Models;
using Splitzies.Repositories;

namespace Splitzies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
  
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUserProfiles());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);

        }

        [HttpGet("login/{firebaseId}")]
        public IActionResult GetUserProfile(string firebaseId)
        {
            return Ok(_userProfileRepository.GetByFirebaseId(firebaseId));
        }


        [HttpDelete("{id}")]
        public IActionResult Deactivate(int id)
        {
            _userProfileRepository.Deactivate(id);
            return NoContent();
        }

        [HttpGet("searchForUser")]
        public IActionResult SearchByFirstLastAndDisplayName(string f, bool sortDesc)
        {
            return Ok(_userProfileRepository.SearchByFirstLastAndDisplayName(f, sortDesc));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseId = userProfile.FirebaseId },
                userProfile);
        }
    }
}
