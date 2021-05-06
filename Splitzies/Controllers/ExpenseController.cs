﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Splitzies.Repositories;

namespace Splitzies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ExpenseController(
           IExpenseRepository expenseRepository,
           IUserProfileRepository userProfileRepository)
        {
            _expenseRepository = expenseRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_expenseRepository.GetAllExpensesBySplitzId(id));
        }
    }
}