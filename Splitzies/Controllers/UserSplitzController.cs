using Microsoft.AspNetCore.Mvc;
using Splitzies.Repositories;
using System.Security.Claims;
using Splitzies.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Splitzies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserSplitzController : ControllerBase
    {
        private readonly IUserSplitzRepository _userSplitzRepository;
       

        [HttpGet]
        public IActionResult Get(int splitzId)
        {
            return Ok(_userSplitzRepository.GetUserProfilesByUserSplitzId(splitzId));
        }

        [HttpPost]
        public IActionResult Post(UserSplitz userSplitz)
        {
            _userSplitzRepository.Add(userSplitz);
            return CreatedAtAction("GetById", new { id = userSplitz.Id }, userSplitz);
        }
    }
}
