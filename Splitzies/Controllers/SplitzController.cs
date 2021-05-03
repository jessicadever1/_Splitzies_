﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            string firebaseUserProfileId = GetCurrentFirebaseUserProfileId();
            var splitzies = _splitzRepository.GetSplitzByFirebaseId(firebaseUserProfileId);
            return Ok(splitzies);
        }

        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }

    }
}