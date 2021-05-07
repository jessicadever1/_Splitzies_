using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Splitzies.Repositories;
using System.Security.Claims;
using Splitzies.Models;

namespace Splitzies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class SplitzController : ControllerBase
    {
        private readonly ISplitzRepository _splitzRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public SplitzController(
           ISplitzRepository splitzRepository,
           IUserProfileRepository userProfileRepository)
        {
            _splitzRepository = splitzRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet("MySplitz")]
        public IActionResult MySplitz()
        {
            var userProfile = GetCurrentUserProfile();
            var id = userProfile.Id;
            var splitzies = _splitzRepository.GetSplitzByUserProfileId(id);
            
            return Ok(splitzies); 
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = GetCurrentUserProfile();
            var userProfileId = userProfile.Id;

            var splitz = _splitzRepository.GetById(id, userProfileId);
            if (splitz == null)
            {
                return NotFound();
            }
            return Ok(splitz);

        }


        [HttpPost]
        public IActionResult Post(SplitzUsersCreate splitz)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var userProfileId = currentUserProfile.Id;

            _splitzRepository.Add(splitz, userProfileId);
            return CreatedAtAction("Get", new { id = splitz.Id }, splitz);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _splitzRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Splitz splitz)
        {
            if (id != splitz.Id)
            {
                return BadRequest();
            }

            _splitzRepository.Update(splitz);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }


        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }

    }
}
