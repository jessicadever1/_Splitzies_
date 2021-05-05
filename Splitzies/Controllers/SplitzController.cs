using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Splitzies.Repositories;
using System.Security.Claims;
using Splitzies.Models;
using System.Collections.Generic;

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

        [HttpPost]
        public IActionResult Post(Splitz splitz)
        {
            
            _splitzRepository.Add(splitz);
            return CreatedAtAction("Get", new { id = splitz.Id }, splitz);
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
    }
}
