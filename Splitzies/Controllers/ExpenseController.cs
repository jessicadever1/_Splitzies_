using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Splitzies.Repositories;
using Splitzies.Models; 

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

        [HttpGet]
        public IActionResult GetAllExpenses()
        {
            return Ok(_expenseRepository.GetAllExpenses());
        }

        [HttpGet("getBySplitzId/{id}")]
        public IActionResult GetAllExpensesBySplitzId(int id)
        {
            return Ok(_expenseRepository.GetAllExpensesBySplitzId(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var expense = _expenseRepository.GetById(id);
            if (expense == null)
            {
                return NotFound();
            }
            return Ok(expense);

        }


        [HttpPost]
        public IActionResult Post(Expense expense)
        {
            _expenseRepository.Add(expense);
            return CreatedAtAction("GetById", new { id = expense.Id }, expense);
        }

    }
}
